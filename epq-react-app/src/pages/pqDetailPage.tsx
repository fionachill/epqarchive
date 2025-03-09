import React, {useEffect, useState} from "react";
import Header from "../components/header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 
import ListGroup from "react-bootstrap/ListGroup";
import { BasePQProps } from "../types/interfaces";
// import { DetailsProps } from "../types/interfaces";
import { BaseSpeechProps } from "../types/interfaces";
import SpeechList from "../components/speechList";
import { Base64 } from "js-base64";
import { useParams } from "react-router-dom";
import axios from "axios";

const PQDetailPage: React.FC = () => {
    const { id } = useParams();
    const [pq, setPQ] = useState<BasePQProps>();    
    const [speeches, setSpeeches] = useState<BaseSpeechProps[]>([]);
    //    const [details, setDetails] = React.useState<DetailsProps>();

    
    const decodeId = (id: string) => {
        return Base64.decode(id);
    };

    const fetchPQData = async (uri: string) => {
        console.log("Fetching PQ data from Oireachtas API");
        try {
            const res = await axios.get(`https://api.oireachtas.ie/v1/questions?qtype=oral,written&question_id=${uri}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSpeeches = async (uri: string) => {
        console.log("Contacting backend to fetch xml data");
        try {
            const res = await axios.get(`http://localhost:3000/api/fetch-xml?url=${uri}`);
            console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        console.log("Fetching PQ");
        if (id) {
            const uri = decodeId(id);
            fetchPQData(uri)
            .then((pq) => {
                setPQ(pq.results[0]);
            })
        }
    }, [id]);

    useEffect(() => {
    console.log("Contacting backend to fetch xml data");
    if (pq) {
        const uri = pq.question.debateSection.formats.xml.uri;
        fetchSpeeches(uri||"")
        .then((speeches) => {
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