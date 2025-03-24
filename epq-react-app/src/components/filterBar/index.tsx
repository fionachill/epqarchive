import React, { useState, ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Typeahead, withAsync} from 'react-bootstrap-typeahead';
import { MemberListProps } from '../../types/interfaces';
import { fetchMembers} from '../../api/pq-api';

const AsyncTypeahead = withAsync(Typeahead);

interface FilterBarProps {
    onUserInput: (f: FilterOption, s: string) => void;
    yearFilter: number;
    memberFilter: string;
}

interface apiMemberProps {
    _source: {
        member: {
            fullName: string;
            uri: string;
        }
    }
}

interface apiMemberOptions {
    member: {
        fullName: string;
        uri: string;
    }
}

interface memberList {
    fullName: string;
    uri: string;
}

const currentYear = new Date().getFullYear();


const FilterBar: React.FC<FilterBarProps> = ({ yearFilter, memberFilter, onUserInput }) => {
    const [year, setYear] = useState<string>(yearFilter);
    
    const [apiMembers, setApiMembers] = useState<memberList[]>([]);
    const [member, setMember] = useState<string>(memberFilter);
    const [isLoading, setIsLoading] = useState(false);
    const [memberResults, setMemberResults] = useState<memberList[]>([]);

    const yearList = [];
    for (let i = currentYear; i >=  1990; i--) {
        yearList.push(i);
    };

    // const testMembers = [
    //     {fullName: "Henry J. J. Abbott", uri: "https://data.oireachtas.ie/ie/oireachtas/member/id/Henry-J-J-Abbott.D.1987-03-10"},
    //     {fullName: "Caroline Acheson", uri: "https://data.oireachtas.ie/ie/oireachtas/member/id/Caroline-Acheson.D.1981-06-30"},
    //     {fullName: "Gerry Adams", uri: "https://data.oireachtas.ie/ie/oireachtas/member/id/Gerry-Adams.D.2011-03-09"}
    // ];

    const handleSearch = (query: string) => {
        setIsLoading(true);
        console.log("Searching for: " + query);
        fetchMembers(query)
        .then((response) => {
            const results = response.data.results;
            results.forEach(results => {
                const fullName = results._source.member.fullName;
                const uri = results._source.member.uri;
                memberResults.push({fullName, uri});
            });
            setApiMembers(memberResults);
            setIsLoading(false);
        });
    };

    // const filterBy = () => true;


    const handleChange = (e: ChangeEvent<HTMLSelectElement>, type: FilterOption, value: string) => {
        // preventDefault()
        onUserInput(type, value);
    };

    const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setYear(e.target.value);
        handleChange(e, "year", e.target.value);
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
                    <Form.Select 
                        onChange={handleYearChange} 
                        aria-label="Year" 
                        value={yearFilter}
                    >
                    <option>Year</option>
                    { yearList.map((year, index) => (
                        <option key={index} value={year}>{year}</option>
                        ))}
                    </Form.Select>
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
                    placeholder="Search by Dáil member"
                />
                </Col>
                <Col xs="auto">
                    <Button type="submit" variant="outline-info" size="sm" >
                        Apply filters
                    </Button>
                </Col>
            </Row>
        </Form>
            
    );
}

export default FilterBar;