import React from 'react';
import '../../styles/main_client.scss';
import Product_client_indiLayout from './Product_client_indiLayout';
import { Container, Row, Col } from 'react-bootstrap';

export default function Main_client() {
  return (
    <main className="client_main">
      <nav>
        <ul>
          <li>VIEW ALL</li>
          <li>NEW ARRIVALS</li>
          <li>BEANIE</li>
          <li>HAT</li>
          <li>MUFFLER</li>
        </ul>
      </nav>
      <section className="product_display">
        <Container>
          <Row>
            <Col>
              <Product_client_indiLayout />
            </Col>
            <Col>
              <Product_client_indiLayout />
            </Col>
            <Col>
              <Product_client_indiLayout />
            </Col>
            <Col>
              <Product_client_indiLayout />
            </Col>
            <Col>
              <Product_client_indiLayout />
            </Col>
          </Row>
          <Row>
            <Col>
              <Product_client_indiLayout />
            </Col>
            <Col>
              <Product_client_indiLayout />
            </Col>
            <Col>
              <Product_client_indiLayout />
            </Col>
            <Col>
              <Product_client_indiLayout />
            </Col>
            <Col>
              <Product_client_indiLayout />
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}
