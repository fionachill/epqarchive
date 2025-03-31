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

    const [startYearParam, setStartYearParam] = useState("1900");
    const [endYearParam, setEndYearParam] = useState("2099");
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
            setStartYearParam(year);
            setEndYearParam(year);
            setCurrentPage(1);
        }  else if(member !== "") {
            setMemberParam(member);
            setCurrentPage(1);
        } else if(year !== "") {
            setStartYearParam(year);
            setEndYearParam(year);
            setCurrentPage(1);
        }
    };


    useEffect(() => {
        const skip = calculateSkip(currentPage, limit);
        console.log(`Fetching PQ page ${currentPage}`);
        fetchPQsWithParams(skip, limit, startYearParam, endYearParam, memberParam)
        .then((response) => {
            setPQs(response.data.results);
            setResultCount(response.data.head.counts.resultCount);
        });
    }, [currentPage, startYearParam, endYearParam, memberParam]);


    
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