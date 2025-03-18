import React, {useState, ChangeEvent, MouseEvent } from 'react';
import Pagination from "react-bootstrap/Pagination";
import { HomePageProps } from '../../types/interfaces.ts';

interface PaginateProps {
    currentPage: number,
    resultCount: number,
    limit: number,
    onPageChange: (pageNum: number) => void,
};


const Paginate: React.FC<PaginateProps> = props => {

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
        <Pagination>
        <Pagination.First onClick={handleFirstPage} disabled={props.currentPage === 1}/>
        <Pagination.Prev onClick={handlePrevPage} disabled={props.currentPage === 1}/>
        <Pagination.Item>{props.currentPage}</Pagination.Item>
        <Pagination.Next onClick={handleNextPage} disabled={props.currentPage === totalPages}/>
        <Pagination.Last onClick={handleLastPage} disabled={props.currentPage === totalPages}/>
    </Pagination>
    )

    : null
    }
    </>
    
    
    );
}

export default Paginate;