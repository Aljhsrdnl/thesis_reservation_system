const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

//connecting to MongoDB
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, {
    useNewUrlParser: true,
	useUnifiedTopology: true,
})
    .then(console.log('successfully connected to database'))





app.get('/', (req, res) => {
    res.send('Hello World')
})

const port = process.env.PORT || 4000;
app.listen(port, (err) =>{
    if(err) console.log(err);
    console.log(`Server is listening on port ${port}`)
})