import React, { useState, useEffect } from 'react';
import Header from "../components/header";
import { BasePQProps } from '../types/interfaces';
import PQList from "../components/pqList";
import Container from "react-bootstrap/Container";

const HomePage: React.FC= () => {
    const [pqs, setPQs] = useState<BasePQProps[]>([]);
    

    useEffect(() => {
        console.log("Fetching PQs");
        fetch(
            `https://api.oireachtas.ie/v1/questions?limit=10&qtype=oral,written`
        )
            .then((res) =>  res.json())
            .then((json) => {
                console.log(json);
                return json.results;
            })
            .then((pqs) => {
                setPQs(pqs);
            });    
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
            <Header/>
            <Container>
                <PQList pqs={pqs}></PQList>
            </Container>
        </>  
    );
};

export default HomePage;