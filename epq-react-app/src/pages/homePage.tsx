import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../components/header";
import { FilterOption } from '../types/interfaces';
import { BasePQProps } from "../types/interfaces";
import PQList from "../components/pqList";
import FilterBar from "../components/filterBar";
import Paginate from "../components/paginate";
import { fetchPQsPage } from "../api/pq-api";


const calculateSkip = (currentPage: number, limit: number) => {
    let skip = 0;
    if(currentPage > 1) {
        skip = (currentPage - 1)  * limit;
    }
    return skip;  
};


const HomePage: React.FC = () => {
    const [pqs, setPQs] = useState<BasePQProps[]>([]);

    const [yearFilter, setYearFilter] = useState(2025);
    const [memberFilter, setMemberFilter] = useState("");

    // These are used for pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [resultCount, setResultCount] = useState<number>(0);
    // Pagination Logic

    const limit = 10;

    const changePage = (pageNum: number) => 
        setCurrentPage(pageNum);

    // Function passed to filter bar
    const handleChange = (type: FilterOption, value: string) => {
        if (type === "year") setYearFilter(Number(value));
        else setMemberFilter(value);
    };


    // const applyFilter = (year: number) => {
    //     console.log(`Fetching PQs from ${year}`);
    //     let skip = 0;
    //     if(currentPage > 1)  {
    //         skip = (currentPage - 1)  * limit;  
    //     };
    //     try {
    //         fetchFilteredPQs(skip, limit, year)
    //         .then((response) => {
    //             setPQs(response.data.results);
    //             setResultCount(response.data.head.counts.resultCount);
    //         })
    //     } catch {
    //         console.log("Error fetching PQs");
    //     }
    // }, [currentPage, pqs, resultCount, year]);

    useEffect(() => {
        const skip = calculateSkip(currentPage, limit);
        console.log(`Fetching PQ page ${currentPage}`);
        fetchPQsPage(skip, limit)
        .then((response) => {
            setPQs(response.data.results);
            setResultCount(response.data.head.counts.resultCount);
        });
    }, [currentPage]);

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
                        onUserInput={handleChange}
                        yearFilter={yearFilter}
                        memberFilter={memberFilter}
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