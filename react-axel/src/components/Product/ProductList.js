import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('authToken');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Erro ao obter produtos:', error);
                alert('Erro ao obter produtos.');
            }
        };

        fetchProducts();
    }, [navigate]);

    const handleView = (id) => {
        navigate(`/products/${id}`);
    }

    const handleEdit = (id) => {
        navigate(`/products/${id}/edit`);
    }

    const handleDelete = async (id) => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            navigate('/login');
            return;
        }

        try {
            await axios.delete(`http://localhost:3000/api/products/${id}`);

            const response = await axios.get('http://localhost:3000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Erro ao obter produtos:', error);
            alert('Erro ao obter produtos.');
        }
    }

    return (
        <Container className="mt-5">
            <Table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.amount}</td>
                            <td>
                                <button className='btn btn-secondary me-2' onClick={() => handleView(product._id)}>Ver</button>
                                <button className='btn btn-primary me-2' onClick={() => handleEdit(product._id)}>Editar</button>
                                <button className='btn btn-danger' onClick={() => handleDelete(product._id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ProductList;
