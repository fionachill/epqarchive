import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


const Header: React.FC = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img 
                        alt=""
                        src="/harp.svg"
                        width="50"
                        height="50"
                        className="d-inline-block"
                    />{' '}
                    ePQ
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Header;
