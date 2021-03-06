require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const path = require('path');
const parser = require('body-parser');
const routers = require('./routers');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error => {
    if (error) throw error;
    console.log('Successfully connected to MongoDB!');
});

app.use(cors());

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use('/images', routers.ImageRouter);
app.use('/properties', routers.PropertyRouter);
app.use('/users', routers.UserRouter);

app.use(express.static(path.resolve(__dirname, './dist/e-realtor')));
app.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname))
);

app.listen(PORT,  error => {
    if (error) throw error;
    console.log(`Server successfully started on port ${ PORT }!`);
});
