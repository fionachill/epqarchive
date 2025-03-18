import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import Header from "../components/header";
import { BasePQProps } from '../types/interfaces';
// import { HomePageProps } from "../types/interfaces";
import PQList from "../components/pqList";
import FilterBar from "../components/filterBar";
import Paginate from "../components/paginate";
import { fetchPQsPage } from "../api/pq-api";

const HomePage: React.FC = () => {
    const [pqs, setPQs] = useState<BasePQProps[]>([]);

    // These are used for pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [resultCount, setResultCount] = useState<number>(0);

    const limit = 10;
    // In a future version users can set the limit of PQs shown 
    // const [limit, setLimit] = useState<number>(10);

    
    // Pagination Logic
    const changePage = (pageNum: number) => 
        setCurrentPage(pageNum);


    useEffect(() => {
        let skip = 0;
        if(currentPage > 1)  {
            skip = (currentPage - 1)  * limit;  
        };
        console.log(`Fetching PQ page ${currentPage}`);
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
    }, [currentPage, pqs, resultCount, totalPages]);

    
    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <FilterBar />
                </Row>
                <Row>
                    <Col>
                        <PQList pqs={pqs}></PQList> 
                    </Col>
                    
                </Row>
                <Paginate 
                    resultCount={resultCount}
                    limit={limit}
                    currentPage={currentPage}
                    onPageChange={changePage}
                    >
                </Paginate>
                <Row><em>Page {currentPage} of {totalPages}</em></Row>
            </Container>
        </>
    );
}

export default HomePage;