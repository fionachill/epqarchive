import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const currentYear = new Date().getFullYear();


const FilterBar: React.FC = () => {
    const [year, setYear] = useState(currentYear);

    const yearList = [];
    for (let i = 1990; i <= currentYear; i++) {
        yearList.push(i);
    };

    const handleYearChange = (e) => {
        const selectedYear = Number(e.currentTarget.value);
        setYear(selectedYear);
        console.log(year);
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
                    <Form.Select onChange={handleYearChange} aria-label="Year">
                    <option>Year</option>
                    { yearList.map((year, index) => (
                        <option key={index} value={year}>{year}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col xs="auto">
                    <Form.Control aria-label="Member" placeholder="Person"></Form.Control>              
                </Col>
                <Col xs="auto">
                    <Button type="submit" variant="outline-info" size="sm" >
                        Filter
                    </Button>
                </Col>
            </Row>
        </Form>
            
    );
}

export default FilterBar;