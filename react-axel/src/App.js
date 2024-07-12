import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ProductList from './components/Product/ProductList';
import ProductForm from './components/Product/ProductForm';
import PrivateRoute from './components/PrivateRoute';
import ProductDetails from './components/Product/ProductDetails';
import ProductEdit from './components/Product/ProductEdit';

const App = () => {
    return (
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/products/add" element={<ProductForm />} />
                        <Route path="/products/:id" element={<ProductDetails />} />
                        <Route path="/products/:id/edit" element={<ProductEdit />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
