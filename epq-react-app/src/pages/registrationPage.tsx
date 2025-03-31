import React, {useState, useEffect} from "react";
import Header from "../components/header";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const RegistrationPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");

    const [valid, setValid] = useState(false);


    

return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <Col>
                        <h3>Register</h3>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col cs lg="4">
                        <Form>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="reenterpassword">
                                <Form.Label>Re-enter Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="info" type="submit" disabled={!valid}>
                                Register
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default RegistrationPage;