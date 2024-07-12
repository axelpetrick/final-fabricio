const Product = require('../models/product'); 

const createProduct = async (req, res) => {
    try {
        const { name, price, amount } = req.body;
        const product = new Product({ name, price, amount }); 
        await product.save();
        res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
    } catch (error) {
        res.status(400).send({ message: 'Erro ao cadastrar produto', error });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao obter produtos', error });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send({ message: 'Produto não encontrado' });
        }

        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao obter produto', error });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });

        if (!product) {
            return res.status(404).send({ message: 'Produto não encontrado' });
        }

        res.status(200).send({ message: 'Produto atualizado com sucesso!', product });
    } catch (error) {
        res.status(500).send({ message: 'Erro ao atualizar produto', error });
    }
};

const deleteProduct = async (req, res) => {
    console.log(req.params);
    try {
        const { id } = req.params;
        console.log(id);

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).send({ message: 'Produto não encontrado', id });
        }

        res.status(200).send({ message: 'Produto deletado com sucesso!' });
    } catch (error) {
        res.status(500).send({ message: 'Erro ao deletar produto', error });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};