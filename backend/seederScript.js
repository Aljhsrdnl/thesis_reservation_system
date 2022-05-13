require('dotenv').config();
const itemsData = require('./data/itemsData');
const connectDB = require('./config/db');
const Item = require('./models/Item');

connectDB();
//delete all items in DB and insert new documents

console.log(itemsData)
const importData = async() => {
    try {
        await Item.deleteMany({});
        await Item.insertMany(itemsData);
        console.log('Data import success');
        process.exit();
    }
    catch(err) {
        console.error(`Unable to import data ${err}`)
        process.exit(1);
    }
}

importData();