const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'axel-api';


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(400).send({ message: 'Erro ao registrar usuário', error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).send({ message: 'Senha incorreta' });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).send({ message: 'Login bem-sucedido', token });
    } catch (error) {
        res.status(400).send({ message: 'Erro ao fazer login', error });
    }
};

module.exports = {
    register,
    login,
};
