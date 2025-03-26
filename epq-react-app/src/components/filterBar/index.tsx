import React, { useState, ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Typeahead, withAsync} from 'react-bootstrap-typeahead';
import { fetchMembers} from '../../api/pq-api';
const AsyncTypeahead = withAsync(Typeahead);

interface FilterBarProps {
    onApplyFilters: (options: {year?: string; member?: string}) => void;
    year?: string;
    member?: string;
}

interface memberList {
    fullName: string;
    uri: string;
}

const currentYear = new Date().getFullYear();


const FilterBar: React.FC<FilterBarProps> = ({ onApplyFilters }) => {
    const [yearOption, setYearOption] = useState("");
    const [memberOption, setMemberOption] = useState("");    


    // These options are for populating the async typeahead 
    const [apiMembers, setApiMembers] = useState<memberList[]>([]);
    const [selectedAPIMember, setSelectedAPIMember] = useState<memberList[]>([]);
    const [memberURI, setMemberURI] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const yearList = [];
    for (let i = currentYear; i >=  1990; i--) {
        yearList.push(i);
    };


    const handleSearch = (query: string) => {
        setIsLoading(true);
        console.log("Searching for: " + query);
        fetchMembers(query)
        .then((response) => {
            const results = response.data.results;
            const memberResults: memberList[] = [];
            results.forEach(results => {
                const fullName = results._source.member.fullName;
                const uri = results._source.member.uri;
                memberResults.push({fullName, uri});
            });
            setApiMembers(memberResults);
            setIsLoading(false);
        });
    };


    const handleSubmit = () => {
        if(yearOption !== "" || memberOption !== "") {
            console.log(`Year: ${yearOption} Member: ${memberOption} being passed to parent`)
            onApplyFilters({year: yearOption, member: memberOption});
        } 
    };

    const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setYearOption((e.target.value));
        console.log(yearOption);
    };

    const handleMemberChange = async(selected) => {
        if (selected.length == 1) {
            const uri = selected[0].uri;
            console.log(uri);
            setMemberOption(uri);
        } else if(selected.length === 0) {
            setSelectedAPIMember([]);
            setMemberOption("");
        } 
    };


    return (
        <Form>
            <Row className="align-items-center">
                <Col xs="auto">
                    <img 
                        src="/filter.svg" 
                        alt="filter icon" 
                        width="30" 
                        height="30"
                        className="d-inline-block" 
                    />{''} 
                    Filter Options
                </Col>

                <Col xs="auto">
                <AsyncTypeahead
                    ignoreDiacritics={false}
                    id="member-search"
                    isLoading={isLoading}
                    labelKey="fullName"
                    minLength={3}
                    onSearch={handleSearch}
                    options={apiMembers}
                    onChange={(selected) => handleMemberChange(selected)}
                    placeholder="Search by Dáil member"
                />
                </Col>
                <Col xs="auto">
                    <Form.Select 
                        onChange={handleYearChange} 
                        aria-label="Year" 
                        value={yearOption}
                    >
                    <option>Year</option>
                    { yearList.map((year, index) => (
                        <option key={index} value={year}>{year}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col xs="auto">
                    <Button variant="outline-info" size="sm" onClick={handleSubmit}>
                        Apply filters
                    </Button>
                </Col>
            </Row>
        </Form>
            
    );
}

export default FilterBar;