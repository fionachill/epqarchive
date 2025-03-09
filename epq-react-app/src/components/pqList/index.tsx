import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { BasePQListProps } from '../../types/interfaces';
import { Base64 } from 'js-base64';
import { Link } from "react-router-dom";


const PQList: React.FC<BasePQListProps> = ({pqs}) => {

    const encodeUri = (uri: string) => {
        return Base64.encode(uri);
    };

    const pqsWithId = pqs.map((pq => ({
        ...pq, id: encodeUri(pq.question.uri)
    })));


    return (
        <>
            <Container fluid>
                <Table className="table-hover" responsive="lg">
                    <thead>
                        <tr>
                            <th className="col-sm-2">Department</th>
                            <th className="col-sm-2">Topic</th>
                            <th className="col-sm-4">Question</th>
                            <th className="col-sm-1">Type</th>
                            <th className="col-sm-2">Date</th>
                            <th className="col-sm-1"></th> 
                        </tr>
                    </thead>
                    <tbody>
                        {pqs ? (
                            pqsWithId.map((pq, index) => (
                                <tr key={index}>
                                    <td>{pq.question.to.showAs}</td>
                                    <td>{pq.question.debateSection.showAs}</td>
                                    <td>{pq.question.showAs}</td>
                                    <td>{pq.question.questionType}</td>
                                    <td>{pq.question.date}</td>
                                    <td>
                                        <Link to={`/pqs/${pq.id}`}>
                                            <Button>More Information</Button>
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