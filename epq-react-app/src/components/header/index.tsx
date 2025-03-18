import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Header: React.FC = () => {
    return (
        <Navbar expand="lg" className="mainnavbar" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand className="mainnavbar" href="/">
                    <img 
                        alt=""
                        src="/harp.svg"
                        width="50"
                        height="50"
                        className="d-inline-block"
                    />{' '}
                    ePQ
                </Navbar.Brand>
                <Nav className="justify-content-flex-start">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search - coming soon"
                    className="me-2"
                    aria-label="Search"
                  />
                <Button variant="outline-secondary">Search</Button>
                </Form>
            </Container>
        </Navbar>
    );
}

export default Header;
