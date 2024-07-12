const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = 3000;

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

mongoose.connect('mongodb+srv://cityparadiserp:123456aA@axelapi.zpgprxm.mongodb.net/?retryWrites=true&w=majority&appName=axelapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/api/users', userRoutes);
app.use('/api/', productRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});