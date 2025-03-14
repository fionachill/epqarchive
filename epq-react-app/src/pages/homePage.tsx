import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import Header from "../components/header";
import { BasePQProps } from '../types/interfaces';
// import { HomePageProps } from "../types/interfaces";
import PQList from "../components/pqList";
import SearchFilter from "../components/searchFilter";
import { fetchPQsPage } from "../api/pq-api";

const HomePage: React.FC = () => {
    const [pqs, setPQs] = useState<BasePQProps[]>([]);

    // These are used for pagination
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [resultCount, setResultCount] = useState<number>(0);
    // const [limit, setLimit] = useState<number>(10);

    // Pagination Logic

    const handleFirstPage = () => {
        if (page !== 1) {
            setPage(1);
        }
    };

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

    const handleLastPage = () => {
        if (page !== totalPages) {
            setPage(totalPages);
        }
    };


    useEffect(() => {
        const limit = 10;
        let skip = 0;
        if(page > 1)  {
            skip = (page - 1)  * limit;  
        };
        console.log(`Fetching PQ page ${page}`);
        try {
            fetchPQsPage(skip, limit)
            .then((response) => {
                setPQs(response.data.results);
                setResultCount(response.data.head.counts.resultCount);
                setTotalPages(Math.ceil(resultCount/limit));
            })
        } catch {
            console.log("Error fetching PQs");
        }
    }, [page, pqs, resultCount, totalPages]);

    
    return (
        <>
            <Header />
            <Container fluid>

                <Row>
                    <Col sm={3}>
                        <SearchFilter />
                    </Col>
                    <Col sm={8}>
                        <PQList pqs={pqs}></PQList> 
                    </Col>
                    
                </Row>
                
                <Pagination>
                    <Pagination.First onClick={handleFirstPage} disabled={page === 1}/>
                    <Pagination.Prev onClick={handlePrevPage} disabled={page === 1}/>
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={handleNextPage} disabled={page === totalPages}/>
                    <Pagination.Last onClick={handleLastPage} disabled={page === totalPages}/>
                </Pagination>
                <Row><em>Page {page} of {totalPages}</em></Row>
            </Container>
        </>
    );
}

export default HomePage;