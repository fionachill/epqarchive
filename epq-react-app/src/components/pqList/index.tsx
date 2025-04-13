import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { BasePQListProps } from '../../types/interfaces';
import { Link } from "react-router-dom";


const PQList: React.FC<BasePQListProps> = ({pqs}) => {


    return (
        <>
            <Container fluid>
                <Table className="table-hover" responsive="lg">
                    <thead>
                        <tr>
                            <th className="col-sm-1">Department</th>
                            <th className="col-sm-1">Topic</th>
                            <th className="col-sm-5">Question</th>
                            <th className="col-sm-1">Type</th>
                            <th className="col-sm-1">Date</th>
                            <th className="col-sm-1"></th> 
                        </tr>
                    </thead>
                    <tbody>
                        {pqs ? (
                            pqs.map((pq, index) => (
                                <tr key={index}>
                                    <td>{pq.question.dept}</td>
                                    <td>{pq.question.topic}</td>
                                    <td>{pq.question.questionText}</td>
                                    <td>{pq.question.questionType}</td>
                                    <td>{pq.question.date}</td>
                                    <td>
                                        <Link to={`/pqs/${pq.id}`}>
                                            <Button variant="warning">More Information</Button>
                                        </Link>
                                    </td>    
                                </tr>
                            ))
                        ) : ( 
                            <tr> 
                                <td>No PQs available</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </>       
    );
};

export default PQList;