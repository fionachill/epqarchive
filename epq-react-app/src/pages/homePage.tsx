import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../components/header";
import { BasePQProps } from "../types/interfaces";
import PQList from "../components/pqList";
import FilterBar from "../components/filterBar";
import Paginate from "../components/paginate";
import { fetchPQsWithParams } from "../api/pq-api";


const calculateSkip = (currentPage: number, limit: number) => {
    let skip = 0;
    if(currentPage > 1) {
        skip = (currentPage - 1)  * limit;
    }
    return skip;  
};


const HomePage: React.FC = () => {
    const [pqs, setPQs] = useState<BasePQProps[]>([]);

    const [startYear, setStartYear] = useState("1900");
    const [endYear, setEndYear] = useState("2099");
    const [memberParam, setMemberParam] = useState("");

    // Pagination Logic
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [resultCount, setResultCount] = useState<number>(0);


    const limit = 10;

    const changePage = (pageNum: number) => 
        setCurrentPage(pageNum);

    // Function passed to filter bar
    const handleChange = (options) => {
        const year = options.year;
        const member = options.member;
        console.log("Applying Filters");
        if(member !== "" && year !== "") {
            setMemberParam(member);
            setStartYear(year);
            setEndYear(year);
        }  else if(member !== "") {
            setMemberParam(member);
        } else if(year !== "") {
            setStartYear(year);
            setEndYear(year);
        }
    };


    useEffect(() => {
        const skip = calculateSkip(currentPage, limit);
        console.log(`Fetching PQ page ${currentPage}`);
        fetchPQsWithParams(skip, limit, startYear, endYear, memberParam)
        .then((response) => {
            setPQs(response.data.results);
            setResultCount(response.data.head.counts.resultCount);
        });
    }, [currentPage, startYear, endYear, memberParam]);

    // useEffect(() => {
    //     calculateSkip(currentPage, limit);
    //     console.log(`Fetching PQ page ${currentPage}`);
    //     try {
    //         fetchPQsPageDateFilter(skip, limit, year)
    //         .then((response) => {
    //             setPQs(response.data.results);
    //             setResultCount(response.data.head.counts.resultCount);
    //         })
    //     } catch {
    //         console.log("Error fetching PQs");
    //     }
    // }, [currentPage, pqs, resultCount, year]);

    
    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <FilterBar
                        onApplyFilters={handleChange}
                     />
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
            </Container>
        </>
    );
}

export default HomePage;