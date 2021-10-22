
const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({

    OrderId:{
        type : Number,
        required: true
    },
    CustomerId:{
        type : Number,
        required: true
    },
    OrderDate:{
        type : Date,
        required: true
    },
    OrderAmount:{
        type : Number,
        required: true
    },
    OrderItems:{
        type : [[Number]],
        required: true
    }
});

const order = mongoose.model( 'Order' , ordersSchema );

module.exports = order;