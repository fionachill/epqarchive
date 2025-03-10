import React, {useEffect, useState} from "react";
import Header from "../components/header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 
import ListGroup from "react-bootstrap/ListGroup";
import { BasePQProps } from "../types/interfaces";
import { BaseSpeechProps } from "../types/interfaces";
import SpeechList from "../components/speechList";
import { fetchPQData, fetchXML } from "../api/pq-api";
import { Base64 } from "js-base64";
import { useParams } from "react-router-dom";


const PQDetailPage: React.FC = () => {
    const { id } = useParams();
    const [pq, setPQ] = useState<BasePQProps>();    
    const [speeches, setSpeeches] = useState<BaseSpeechProps[]>([]);

    // This is the groundwork for returning more information from the XML, such as the speakers and their roles. 
    //    const [details, setDetails] = React.useState<DetailsProps>();

    const decodeId = (id: string) => {
        return Base64.decode(id);
    };
   
    useEffect(() => {
        console.log("Fetching PQ");
        if (id) {
            const uri = decodeId(id);
            fetchPQData(uri)
            .then((pq) => {
                setPQ(pq);
            })
        }
    }, [id]);

    useEffect(() => {
    console.log("Contacting backend to fetch xml data");
    if (pq) {
        const uri = pq.question.debateSection.formats.xml.uri;
        fetchXML(uri)
        .then((speeches) => {
            console.log(speeches);
            setSpeeches(speeches);
        })
        .catch((error) => {
            console.log(error);
        });
        }
    }, [pq]);

    return (
        <>
            <Header/>
            <Container fluid>
                <Row>
                    { pq ? (
                        <>
                            <Row>
                                <Col>
                                    <p><em>{pq.question.showAs.substring(3)}</em></p>
                                         { 
                                            speeches ? (
                                                <SpeechList speeches={speeches}/>
                                            ) : ( 
                                                <p>Speech data not found</p>
                                            )
                                        } 
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
                            </Row> 
                        </>
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