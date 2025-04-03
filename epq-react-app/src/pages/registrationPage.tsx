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

interface regForm {
    email: string;
    password: string;
    reenterpassword: string;
};

const salt = bcrypt.genSaltSync(10);


const RegistrationPage: React.FC = () => {


    const { register, handleSubmit } = useForm<regForm>();

    const onSubmit = async (data: regForm) => {
        if (data.password !== data.reenterpassword) {
            alert("Passwords do not match. Please try again.");
            return;
        } else if (data.password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        } else {
            alert("Registration successful! You can now log in.");
            try {
                const hash = bcrypt.hashSync(data.password, salt);
                console.log(hash);
                const email = data.email;
                await axios.post(`http://localhost:3000/users`, {
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
        console.log(`Submitted: `, data);
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
                            <Card.Header>Sign up</Card.Header>
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
                                            placeholder="Password"
                                            {...register("password", {required: true})}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a password
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="reenterpassword">
                                        <Form.Label>Re-enter Password</Form.Label>
                                        <Form.Control
                                            type="password" 
                                            placeholder="Password" 
                                            {...register("reenterpassword")}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please ensure passwords match
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button variant="info" type="submit">
                                        Register
                                    </Button>
                                    <Row>
                                        <Form.Text muted>
                                            <br></br>Already have an account? <a href="/login">Login</a>
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

export default RegistrationPage;