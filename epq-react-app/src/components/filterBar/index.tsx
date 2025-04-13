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

const yearList: number[] = [];
for (let i = currentYear; i >=  1990; i--) {
    yearList.push(i);
};

const FilterBar: React.FC<FilterBarProps> = ({ onApplyFilters }) => {
    const [yearOption, setYearOption] = useState("");
    const [memberOption, setMemberOption] = useState("");    
    const [optionSelected, setOptionSelected] = useState(false);

    // These options are for populating the async typeahead 
    const [apiMembers, setApiMembers] = useState<memberList[]>([]);
    const [isLoading, setIsLoading] = useState(false);




    const handleSearch = (query: string) => {
        setIsLoading(true);
        console.log("Searching for: " + query);
        fetchMembers(query)
        .then((response) => {
            console.log(response.data.results);
            setApiMembers(response.data.results);
            console.log(apiMembers);
            setIsLoading(false);
        });
    };


    const handleSubmit = () => {
        if(yearOption !== "" || memberOption !== "") {
            console.log(`Year: ${yearOption} Member: ${memberOption} being passed to parent`)
            onApplyFilters({year: yearOption, member: memberOption});
            setOptionSelected(false);
        } 
    };

    const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setYearOption((e.target.value));
        setOptionSelected(true);
        console.log(yearOption);
    };

    const handleMemberChange = async(selected: Array<memberList>) => {
        if (selected.length == 1) {
            const uri = selected[0].uri;
            console.log(uri);
            setMemberOption(uri);
            setOptionSelected(true);
        } else if(selected.length === 0) {
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
                        labelKey={"fullName"}
                        minLength={3}
                        onSearch={handleSearch}
                        options={apiMembers}
                        onChange={(selected) => handleMemberChange(selected)}
                        placeholder="Questioning TD"
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
                    <Button variant="outline-success" size="sm" onClick={handleSubmit} disabled={!optionSelected}>
                        Apply filters
                    </Button>
                </Col>
            </Row>
        </Form>
            
    );
}

export default FilterBar;