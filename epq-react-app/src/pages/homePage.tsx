import React, { useState, useEffect } from 'react';
import Header from "../components/header";
import { BasePQProps } from '../types/interfaces';
import PQList from "../components/pqList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { fetchPQs } from "../api/pq-api";

const HomePage: React.FC = () => {
    const [pqs, setPQs] = useState<BasePQProps[]>([]);


    useEffect(() => {
        console.log("Fetching PQs from Oireachtas API");
        try {
            fetchPQs()
            .then((pqs) => {
                setPQs(pqs);
            })
        } catch {
            console.log("Error fetching PQs");
        }
    }, []);


    // This is the first iteration of the useEffect to fetch data from my local test data API
    // useEffect(() => {
    //     console.log("Fetching PQs");
    //     axios
    //         .get(`http://localhost:3000/pqs`)
    //         .then((res) => {
    //             const pqs = res.data;
    //             setPQs(pqs);
    //     });
    // }, []);
    
    return (
        <>
            <Header />
            <Container fluid>
                <Row>Search goes here</Row>
                <Row>
                    <PQList pqs={pqs}></PQList> 
                </Row>
            </Container>
        </>
    );
}

export default HomePage;