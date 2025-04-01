import React, {useState, useEffect} from "react";
import Header from "../components/header";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const RegistrationPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {
            register, 
            handleSubmit,
            formState: {errors}, 
        } = useForm();

    const onSubmit = (data) => {
        console.log(`Submitted: `, data);
    };

    useEffect(() => {
        
    })


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
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        required
                                        type="email" 
                                        placeholder="Enter email address"
                                        {...register("email")} 
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid email address
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        required
                                        type="password" 
                                        placeholder="Password"
                                        {...register("password")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a password
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="reenterpassword">
                                    <Form.Label>Re-enter Password</Form.Label>
                                    <Form.Control
                                        required
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
                            </Form>
                        </Card> 
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default RegistrationPage;