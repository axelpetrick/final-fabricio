import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do produto:', error);
                alert('Erro ao buscar detalhes do produto.');
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <p>Carregando...</p>;
    }

    return (
        <Container className="mt-3">
            <h2>Informações do Produto</h2>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Nome
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Nome completo" name="name" value={product.name} disabled />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Preço
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" placeholder="Preço" name="price" value={product.price} disabled />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Quantidade
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" name="amount" placeholder="Quantidade" value={product.amount} disabled />
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default ProductDetails;
