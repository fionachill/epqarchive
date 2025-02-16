import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { BasePQProps } from '../../types/interfaces';

const PQList: React.FC<BasePQProps> = ({pqs}) => {

    return (
        <>
            <Container fluid className="px-5">
                <Table className="table-hover">
                    <thead>
                        <tr>
                            <th className="col-sm-2">PQ Reference</th>
                            <th className="col-sm-2">Due Date</th>
                            <th className="col-sm-8">Question</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pqs ? (
                            pqs.map((pq, index) => (
                                <tr key={index}>
                                    <td>pq.pqref</td>
                                    <td>{pq.due_oireachtas}</td>
                                    <td>{pq.question}</td>
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