import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Pagination from "react-bootstrap/Pagination";

import Header from "../components/header";
import { BasePQProps } from '../types/interfaces';
import { HomePageProps } from "../types/interfaces";
import PQList from "../components/pqList";

// import { fetchPQs, fetchPQsPage } from "../api/pq-api";
// import { fetchPQsPage } from "../api/pq-api";
import axios from 'axios';

const HomePage: React.FC = () => {
    const [pqs, setPQs] = useState<BasePQProps[]>([]);

    // These are used for pagination
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [resultCount, setResultCount] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);

    // useEffect(() => {
    //     console.log("Fetching PQs from Oireachtas API");
    //     try {
    //         fetchPQs()
    //         .then((pqs) => {
    //             setPQs(pqs);
    //         })
    //     } catch {
    //         console.log("Error fetching PQs");
    //     }
    // }, []);




    // Pagination Logic

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    // const fetchPQsPage = async (page: number) => {
    //     let skip = 0;
    //     if(page < 1)  {
    //         skip = (page*limit);  
    //     };
    //     return axios.get(`https://api.oireachtas.ie/v1/questions?skip=${skip}&limit=${limit}&qtype=oral,written`)
    //     .then((res) => res.data);
    // };


    useEffect(() => {
        let skip = 0;
        if(page < 1)  {
            skip = (page*limit);  
        };
        console.log(`Fetching PQ page ${page}`);
        axios
        .get<HomePageProps>(`https://api.oireachtas.ie/v1/questions?skip=${skip}&limit=${limit}&qtype=oral,written`)
        .then(res => {
            const pqs = res.data.results;
            const resultCount = res.data.head.counts.resultCount;
            setPQs(pqs);
            setResultCount(resultCount);
            setTotalPages(Math.ceil(resultCount/10))
            });
    }, [page, pqs, resultCount, totalPages, limit]);

    
    return (
        <>
            <Header />
            <Container fluid>
                <Row>Search goes here</Row>
                {/* <Row>Current Page: {page}</Row>
                <Row>Total PQs: {resultCount}</Row> */}
                <Row>
                    <PQList pqs={pqs}></PQList> 
                </Row>
                <Row>Total Pages: {totalPages}</Row>
                <Pagination>
                    <Pagination.Prev onClick={handlePrevPage} disabled={page === 1}/>
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={handleNextPage} disabled={page === totalPages}/>
                </Pagination>
            </Container>
        </>
    );
}

export default HomePage;