const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

//routes
const itemsRoutes = require('./routes/itemRoutes')

const app = express();
app.use(express.json());

const connectDB = require('./config/db');
const res = require('express/lib/response')

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

//connecting to MongoDB
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use(itemsRoutes);


const port = process.env.PORT || 4000;
app.listen(port, (err) =>{
    if(err) console.log(err);
    console.log(`Server is listening on port ${port}`)
})