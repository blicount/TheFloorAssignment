const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({

    CustomerId:{
        type : String,
        required: true
    },
    CustomerName:{
        type : String,
        required: true
    },
    CustomerAddress:{
        type : String,
        required: true
    }
});

const customer = mongoose.model( 'Customer' , customerSchema );

module.exports = customer;