import React from 'react';
import Spinner from 'react-bootstrap/Spinner';


const LoadingSpinner: React.FC = () => {
    return (
        <Spinner animation="border" variant="success" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}

export default LoadingSpinner;