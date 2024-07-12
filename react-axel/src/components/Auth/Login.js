import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', formData);
            const { token } = response.data;

            localStorage.setItem('authToken', token);
            alert('Login bem-sucedido!');
            navigate('/products');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login.');
        }
    };

    return (
        <Container className="mt-3">
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2" htmlFor="email">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" placeholder="email@exmaple.com" name="email" value={formData.email} onChange={handleChange} required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2" htmlFor="password">
                        Senha
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} required />
                    </Col>
                </Form.Group>
                <Button type="submit">Fazer Login</Button>
            </Form>
        </Container>
    );
};

export default Login;
