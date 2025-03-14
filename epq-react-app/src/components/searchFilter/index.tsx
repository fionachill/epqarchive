import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

const SearchFilter: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <Card>
            <Card.Header>Search and Filter</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Label>Search</Form.Label>
                    <Form.Control type="text" placeholder="Search coming soon" />
                    <Form.Label>Filter Options</Form.Label>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Date Filters</Accordion.Header>
                            <Accordion.Body>
                                <Form.Control aria-label="From" placeholder="Start Date"/>
                                <Form.Control aria-label="To" placeholder="End Date"/>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
  
                    <Button variant="outline-primary" type="submit">Apply Filters</Button>
                </Form>     
            </Card.Body>
        </Card>   
    )
}

export default SearchFilter;