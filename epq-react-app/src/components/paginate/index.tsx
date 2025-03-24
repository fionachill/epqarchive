import React from 'react';
import Pagination from "react-bootstrap/Pagination";
import Row from 'react-bootstrap/Row';
import { paginateProps } from '../../types/interfaces';


const Paginate: React.FC<paginateProps> = props => {

    const totalPages = Math.ceil(Number(props.resultCount)/props.limit);

    const handleFirstPage = () => {
        if (props.currentPage !== 1) {
            props.onPageChange(1);
        }
    };

    const handlePrevPage = () => {
        if (props.currentPage > 1) {
            props.onPageChange(props.currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (props.currentPage < totalPages) {
            props.onPageChange(props.currentPage + 1);
        }
    };

    const handleLastPage = () => {
        if (props.currentPage !== totalPages) {
            props.onPageChange(totalPages);
        }
    };



return (
    <>
    { totalPages  && totalPages > 2 ? (
        <Pagination className="justify-content-center">
            <Pagination.First onClick={handleFirstPage} disabled={props.currentPage === 1}/>
            <Pagination.Prev onClick={handlePrevPage} disabled={props.currentPage === 1}/>
            <Pagination.Item>{props.currentPage}</Pagination.Item>
            <Pagination.Next onClick={handleNextPage} disabled={props.currentPage === totalPages}/>
            <Pagination.Last onClick={handleLastPage} disabled={props.currentPage === totalPages}/>
        </Pagination>
    ) : null
    }
        <Row><em>Page {props.currentPage} of {totalPages}</em></Row>
    </>
    );
}

export default Paginate;