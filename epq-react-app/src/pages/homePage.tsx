import React, { useState, useEffect } from 'react';
import Header from "../components/header";
import { BasePQListProps } from '../types/interfaces';
import PQList from "../components/pqList";
import Container from "react-bootstrap/Container";
import axios from 'axios';

const HomePage: React.FC<BasePQListProps> = () => {
    const [pqs, setPQs] = useState<BasePQListProps[]>([]);

    useEffect(() => {
        console.log("Fetching PQs");
        const res = await axios
        .get<BasePQListProps>(`http://localhost:3000/pqs`)
        .then(res => {
            setPQs(res.data);
            }); 
        }, []);



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