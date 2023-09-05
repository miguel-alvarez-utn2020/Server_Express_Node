const mongoose = require('mongoose');//npm install mongoose --save
require('dotenv').config();
const pathDB = process.env.MONGODB_CNN;

const dbConection = async () => {
    try{
        await mongoose.connect( pathDB )
        console.log('DB ONLINE!');
    }
    catch(error){
        console.log(error);
        throw new Error('Couldn\'t connect to Mongoose');
    }
}

module.exports = {
    dbConection
}