const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*', cors());

//middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routes
const projectsRoutes = require('./routes/projects');

const api = process.env.API_URL;

app.use(`${api}/projects`, projectsRoutes);

//Database
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'blog-database',
    })
    .then(() => {
        console.log('Database Connection is ready...');
    })
    .catch((err) => {
        console.log(err);
    });

//Server
app.listen(3000, () => {
    // cke console server running atau tidak
    console.log('server is running http://localhost:3000');
});
