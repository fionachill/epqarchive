import React, {useEffect, useState} from "react";
import Header from "../components/header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 
import ListGroup from "react-bootstrap/ListGroup";
import { BasePQPropsShort } from "../types/interfaces";
import { BaseSpeechProps } from "../types/interfaces";
import SpeechList from "../components/speechList";
import { fetchXML, fetchOnePQ } from "../api/pq-api";
import { Base64 } from "js-base64";
import { useParams } from "react-router-dom";


const PQDetailPage: React.FC = () => {
    const { id } = useParams();
    const [pq, setPQ] = useState<BasePQPropsShort>();
        
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
            fetchOnePQ(uri)
            .then((response) => {
                // console.log(response.data.results);
                const pq = response.data.results[0];
                console.log("pq data:" + pq);
                setPQ(pq);
            })
        }
    }, [id]);

    useEffect(() => {
    console.log("Contacting backend to fetch xml data");
    if (pq) {
        const xmlLink = pq.question.xml;
        fetchXML(xmlLink)
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
                                    <p><em>{pq.question.questionText}</em></p>
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
                                        <ListGroup.Item><strong>Department:</strong> {pq.question.dept}</ListGroup.Item>
                                        <ListGroup.Item><strong>Topic:</strong> {pq.question.topic} </ListGroup.Item>
                                        <ListGroup.Item><strong>Asked by:</strong> {pq.question.td}</ListGroup.Item>
                                        <ListGroup.Item><strong>PQ Reference:</strong> {pq.question.questionText.slice(-11)}</ListGroup.Item>
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