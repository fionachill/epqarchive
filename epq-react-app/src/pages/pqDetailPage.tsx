import React, {useEffect} from "react";
import Header from "../components/header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BasePQProps } from "../types/interfaces";
import { Base64 } from "js-base64";
import { useParams } from "react-router-dom";
const parser = new DOMParser();



const PQDetailPage: React.FC = () => {
    const { id } = useParams();
    const [pq, setPQ] = React.useState<BasePQProps>();    
  
    const decodeId = (id: string) => {
        return Base64.decode(id);
    };

    useEffect(() => {
        console.log("Fetching PQ");
        if (id) {
            const uri = decodeId(id);
        //      console.log(uri);
            fetch(
                `https://api.oireachtas.ie/v1/questions?qtype=oral,written&question_id=${uri}`
            )
                .then((res) => res.json())
                .then((json) => {
                    console.log(json);
                    return json.results[0];
                })
                .then((pq) => {
                    setPQ(pq);
                });
        }
    }, [id]);

    useEffect(() => {
        console.log("Fetching additional PQ data");
        if (pq) {
            const url = pq.question.debateSection.formats.xml.uri;
            fetch(`${url}`, {
                mode: 'no-cors',
                credentials: "include"
            })
            .then ((response) => {
                return response.text();
            })
            .then (xmlText => {
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                console.log(xmlDoc);
            })
        }
    });


    return (
        <>
            <Header/>
            <Container fluid>
                <h1>PQ Details go here</h1>
                { pq ? (
                    <div>
                        <h3>Question</h3>
                        <p>{pq.question.showAs}</p> 
                    </div>
                ) : (
                    <p>PQ data not found</p>
                )
                }
            </Container>
        </>  
    );
}

export default PQDetailPage;