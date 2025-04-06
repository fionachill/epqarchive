import React, { useState } from 'react';
import Header from '../header';
import PQList from '../pqList';
import FilterBar from '../filterBar';
import Paginate from '../paginate';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PQListPageProps } from '../../types/interfaces';


const PQListPageTemplate: React.FC<PQListPageProps> = ({pqs, handleChange }) => {
        // Pagination Logic
        const [currentPage, setCurrentPage] = useState<number>(1);
        const [resultCount, setResultCount] = useState<number>(0);
        const limit = 10;

        const changePage = (pageNum: number) => 
            setCurrentPage(pageNum);

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

export default PQListPageTemplate;