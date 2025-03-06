import React, {useEffect} from "react";
import Header from "../components/header";
import Container from "react-bootstrap/Container";
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
                { pq ? (
                    <div>
                        <h3>Question</h3>
                        <p>{pq.question.showAs.substring(3)}</p>
                            { details ? (
                                <p>There are some details to be had</p>
                                ) : (
                                <p>Can't parse XML data</p>
                            )} 
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