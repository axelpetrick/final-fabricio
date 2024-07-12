import React, { useState } from 'react';
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const ProductForm = () => {
    const [formData, setFormData] = useState({ name: '', price: '', amount: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/products', formData);
            alert('Produto cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            alert('Erro ao cadastrar produto.');
        }
    };

    return (
        <Container className="mt-3">
            <h2>Adicionar Produto</h2>
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
                <Button type="submit">Adicionar Produto</Button>
            </Form>
        </Container>
        // <div>
        //     <h2>Adicionar Produto</h2>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label htmlFor="name">Nome:</label>
        //             <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        //         </div>
        //         <div>
        //             <label htmlFor="price">Preço:</label>
        //             <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        //         </div>
        //         <div>
        //             <label htmlFor="amount">Quantidade:</label>
        //             <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        //         </div>
        //         <button type="submit">Adicionar Produto</button>
        //     </form>
        // </div>
    );
};

export default ProductForm;
