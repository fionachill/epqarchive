import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';



const Header: React.FC = () => {
    const [queryText, setQueryText] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value !== "") {
            setQueryText(value);
            setValid(true);
        } else {
            setValid(false);
        }
    };

    // const handleClick = () => {
    //     if (queryText !== "") {
    //         console.log("Redirecting to search page");
    //         navigate(`/search/${queryText}`);
    //     } else {
    //         alert("Please enter a search term");
    //     }
    // };



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
                    onChange={handleChange}
                  />
                <Link to={`/search/${queryText}`}>
                    <Button variant="outline-secondary" disabled={!valid}>Search</Button>
                </Link>
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
