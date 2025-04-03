import React from "react";
import Header from "../components/header";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import bcrypt from "bcryptjs";
import axios from 'axios';
import { redirect } from "react-router-dom";

interface loginForm {
    email: string;
    password: string;
};

const salt = bcrypt.genSaltSync(10);


const LoginPage: React.FC = () => {

    const { register, handleSubmit } = useForm<loginForm>();

    const onSubmit = async (data: loginForm) => {
        if (!data.password) {
            alert("Please enter a password.");
        } else if (!data.email) {
            alert("Please enter email address.");
        } else {
            try {
                const hash = bcrypt.hashSync(data.password, salt);
                const email = data.email;
                console.log(hash);
                await axios.post(`http://localhost:3000/login`, {
                    email: email,
                    password: hash,
                }).then((response) => {
                    console.log(response.data);
                    return redirect("/");
                })
            } catch (err) {
                console.error(err);
            }
        }
    };


    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <Col><br></br></Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col cs lg="4">
                        <Card>
                            <Card.Header>Log in</Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            placeholder="Enter email address"
                                            {...register("email", { required: true})} 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid email address
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Enter Password"
                                            {...register("password", {required: true})}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a password
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button variant="info" type="submit">
                                        Log in
                                    </Button>
                                    <Row>
                                        <Form.Text muted>
                                            <br></br>Don't have an account? <a href="/register">Register</a>
                                        </Form.Text>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card> 
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LoginPage;