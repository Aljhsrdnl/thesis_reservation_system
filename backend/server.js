const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')   
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

//routes
const itemsRoutes = require('./routes/itemRoutes')
const userRoutes = require('./routes/userRoutes')
const bagRoutes = require('./routes/bagRoutes')

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const connectDB = require('./config/db');
const res = require('express/lib/response')

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//connecting to MongoDB
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api', itemsRoutes);
app.use('/user', userRoutes);
app.use(bagRoutes);

const port = process.env.PORT || 5000;
app.listen(port, (err) =>{
    if(err) console.log(err);
    console.log(`Server is listening on port ${port}`)
})