import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const ProductEdit = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/products/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do produto:', error);
                alert('Erro ao buscar detalhes do produto.');
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();    
        try {
            await axios.put(`http://localhost:3000/api/products/${id}`, formData);
    
            alert('Produto atualizado com sucesso!');
            navigate('/products');
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            alert('Erro ao atualizar produto.');
        }
    };

    if (!formData) {
        return <p>Carregando...</p>;
    }

    return (
        <Container className="mt-3">
            <h2>Editar Produto</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Nome
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Nome completo" name="name" value={formData.name} onChange={handleChange} required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Preço
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" placeholder="Preço" name="price" value={formData.price} onChange={handleChange} required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Quantidade
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" name="amount" placeholder="Quantidade" value={formData.amount} onChange={handleChange} required />
                    </Col>
                </Form.Group>
                <Button type="submit">Editar Produto</Button>
            </Form>
        </Container>
    );
};

export default ProductEdit;
