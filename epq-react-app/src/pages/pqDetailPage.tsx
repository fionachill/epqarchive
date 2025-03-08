import React, {useEffect} from "react";
import Header from "../components/header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 
import ListGroup from "react-bootstrap/ListGroup";
import { BasePQProps } from "../types/interfaces";
import { DetailsProps } from "../types/interfaces";
import { Base64 } from "js-base64";
import { useParams } from "react-router-dom";
import axios from "axios";

const PQDetailPage: React.FC = () => {
    const { id } = useParams();
    const [pq, setPQ] = React.useState<BasePQProps>();    
    const [details, setDetails] = React.useState<DetailsProps>();

    const decodeId = (id: string) => {
        return Base64.decode(id);
    };

    useEffect(() => {
        console.log("Fetching PQ");
        if (id) {
            const uri = decodeId(id);
            fetch(
                `https://api.oireachtas.ie/v1/questions?qtype=oral,written&question_id=${uri}`
            )
                .then((res) => res.json())
                .then((json) => {
                    // console.log(json);
                    return json.results[0];
                })
                .then((pq) => {
                    setPQ(pq);
                });
        }
    }, [id]);

    useEffect(() => {
        console.log("Contacting backend to fetch xml data");
        if (pq) {
            const uri = pq.question.debateSection.formats.xml.uri;
            console.log(uri);
            try {
                const response = axios.get(`/api/fetch-xml?url=${uri}`);
                console.log(response);
                response.then((response) => {
                    setDetails(response.data);
                });  
            } catch (error) {
                console.log(error);
            }
        }
    }, [pq]);

    return (
        <>
            <Header/>
            <Container fluid>
                <Row>
                    { pq ? (
                        <div>
     
                            <Row>
                                { details ? (
                                        <>
                                            <Col>
                                                <div>
                                                    <p><em>{pq.question.showAs.substring(3)}</em></p>
                                                    { 
                                                        details?.speech?.map((speech, eId) => (
                                                            <div key={eId}>
                                                                <h2>{speech.from._}</h2>
                                                                { 
                                                                    speech?.p?.map((p, eId) => <p key={eId}>{p._}</p>)
            
                                                                }  
                                                            </div>
                                                        ))   
                                                    }  
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <ListGroup>
                                                    <ListGroup.Item><strong>Date:</strong> {pq.question.date}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Department:</strong> {pq.question.to.showAs}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Topic:</strong> {pq.question.debateSection.showAs} </ListGroup.Item>
                                                    <ListGroup.Item><strong>Asked by:</strong> {pq.question.by.showAs}</ListGroup.Item>
                                                    <ListGroup.Item><strong>PQ Reference:</strong> {pq.question.showAs.slice(-11)}</ListGroup.Item>
                                                </ListGroup>
                                            </Col>
                                            
                                        </>
                                    ) : (
                                    <p>Can't parse XML data</p>
                                )}
                            </Row> 
                        </div>
                    ) : (
                        <p>PQ data not found</p>
                    )
                    }
                </Row>
            </Container>
        </>  
    );
}

export default PQDetailPage;