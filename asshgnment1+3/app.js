const express = require('express');
const app = express();
const port = process.env.PORT || 3000 ;
const mongoose = require('mongoose');
bodyParser      = require('body-parser');
require('dotenv').config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.MONGO_KEY,{useNewUrlParser:true})
    .then(() => {
        console.log('db connected');
    })
    .catch(err => console.log(`error on db connection >> ${err}`));

app.listen(port , console.log(`listening on Port ${port}`) );

app.use('/customers' , require('./api/customers'));
app.use('/orders' , require('./api/orders'));
app.use('/etlServices',require('./services/etlService'));


app.use('/' ,(req, res) => {
    res.send('root page')});

app.all('*',(req,res) =>{
    res.send('Got lost? This is a friendly 404 page :)');
});