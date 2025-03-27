import React from "react";
import Header from "../components/header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AboutPage: React.FC = () => {
return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <Col>
                        <h3>About ePQ</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>ePQ is a searchable archive of Parliamentary Questions</p>
                        <p>FAQs ?</p>
                    </Col>
                </Row>

            </Container>
        </>
    );
};

export default AboutPage;