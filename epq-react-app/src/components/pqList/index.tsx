import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { BasePQListProps } from '../../types/interfaces';

const PQList: React.FC<BasePQListProps> = ({pqs}) => {

    return (
        <>
            <Container fluid className="px-5">
                <Table className="table-hover">
                    <thead>
                        <tr>
                            <th className="col-sm-1">Department</th>
                            <th className="col-sm-2">Topic</th>
                            <th className="col-sm-7">Question</th>
                            <th className="col-sm-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pqs ? (
                            pqs.map((pq, index) => (
                                <tr key={index}>
                                    <td>{pq.question.to.showAs}</td>
                                    <td>{pq.question.debateSection.showAs}</td>
                                    <td>{pq.question.showAs}</td>
                                    <td>{pq.question.date}</td>
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