const mongoose = require('mongoose');

const connectDb =   async() =>{
     try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/department');
        console.log('Mongoose connected succesfully');
     } catch (error) {
       console.log(error); 
     }
}

module.exports = connectDb;