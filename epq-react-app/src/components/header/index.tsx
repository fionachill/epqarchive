import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import { redirect } from 'react-router-dom';

interface HeaderProps {
    onApplySearch: (query: string) => void;
    query?: string;
};

const Header: React.FC<HeaderProps> = ({onApplySearch}) => {
    const [queryText, setQueryText] = useState<string>("");

    const handleSearchBox = () => {
        if (queryText !== "") {
            console.log("Searching for: " + queryText);
            onApplySearch(queryText);
            // return redirect("/");
        }
    };

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
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                  />
                <Button variant="outline-secondary" onClick={handleSearchBox}>Search</Button>
                </Form>
                <Nav className="justify-content-end">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
