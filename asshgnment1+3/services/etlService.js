const express   = require('express');
const router    = express.Router();
const customersModel = require('../models/customersSchema');
const ordersModel = require('../models/ordersSchema');

const mysql = require('mysql')

// Create Connection
const db = mysql.createPool({
    host : process.env.HOST,
    user :  process.env.USER, 
    password :  process.env.PASSWORD,
    database :  process.env.DATABASE,
})

// order service that execure etl from customers in mysql to mongo db
async function customersService(){
    db.query('SELECT * FROM customers ', function(err, rows, fields) {
        if (err){
            throw new Error(err);
        } 
        customersModel.insertMany(rows, function (err, customers) {
            if (err) {
                throw new Error(err);
            };
            return
        });
    });
} 

router.get('/moveCustomersFromMongoToSql' , async (req,res)=> {
    try{
        await customersService();
        res.status(200).send('customer etl finished')
    } catch(err){
        res.status(400).send(err)
    }
});

// order service that execure etl from orders in mysql to mongo db
async function ordersService(){
    let query = `SELECT orders.*, GROUP_CONCAT(item_to_order.ItemId) as 'items' 
    FROM item_to_order inner join orders on item_to_order.OrderId = orders.OrderId
    GROUP BY item_to_order.OrderId`;

    // execute query that fetch data from my sql database
    db.query(query, function(err, rows, fields) {
        if (err){
            throw new Error(err);
        } 
        //trasform OrderItems to numbers array form items String recived from the mysql db
        for(let i in rows){
            rows[i].OrderItems = rows[i].items.split(',');
        }
        // insert the given results to mongo db
        ordersModel.insertMany(rows, function (err, orders) {
            if (err) {
                throw new Error(err);
            };
            return
        });
    });
} 

router.get('/moveOrdersFromMongoToSql' , async (req,res)=> {
    try{
        await ordersService();
        res.status(200).send('orders etl finished')
    } catch(err){
        res.status(400).send(err)
    }
});


module.exports = router