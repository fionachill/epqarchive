import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../components/header";
import { BasePQPropsShort } from "../types/interfaces";
import PQList from "../components/pqList";
// import FilterBar from "../components/filterBar";
import Paginate from "../components/paginate";
import { fetchAllPQs } from "../api/pq-api";
import { useParams } from "react-router-dom";
// import { redirect } from "react-router-dom";

// interface searchPageProps {
//     queryText: string;
// }

const SearchResultsPage: React.FC = () => {
    const { queryText } = useParams();

    const [query, setQuery] = useState<string>("");
    const [allPqs, setAllPQs] = useState<BasePQPropsShort[]>([]);
    const [searchResults, setSearchResults] = useState<BasePQPropsShort[]>([]);

    // Pagination Logic
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [resultCount, setResultCount] = useState<number>(0);


    const changePage = (pageNum: number) => 
        setCurrentPage(pageNum);


    // Second useEffect to handle the search function
    useEffect(() => {
        if (queryText !== "") {
            setQuery(queryText);
            console.log("Searching for: " + queryText);
            fetchAllPQs()
            .then((response) => {
                setAllPQs(response.data.results);
            });
        }
    }, [queryText]);

    const filteredPQs = allPqs
    .filter((p: BasePQPropsShort) => {
        return p.question.questionText.toLowerCase().search(query.toLowerCase()) !== -1;
    });
    setSearchResults(filteredPQs);
    setResultCount(filteredPQs.length);

    
    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <Col>
                        <PQList pqs={searchResults}></PQList> 
                    </Col>  
                </Row>
                <Paginate 
                    resultCount={resultCount}
                    limit={1000}
                    currentPage={currentPage}
                    onPageChange={changePage}
                    >
                </Paginate>
            </Container>
        </>
    );
}

export default SearchResultsPage;