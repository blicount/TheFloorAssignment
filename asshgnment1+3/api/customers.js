const express   = require('express');
const router    = express.Router();
const customersController = require('../controllers/customersCtl');
const customersModel = require('../models/customersSchema');


router.get('/' , async (req,res)=> {
    try{
        let users = await customersController.getAllCustomers();
        res.status(200).send(users);
    }catch(err){
        res.status(400).send(err);    
    }
});

router.post('/createCustomer',async (req,res)=>{
	try {
        await customersController.createCustomer(req.body.customerObj);
	    return res.status(200).send({status: 'ok', data: 'customer created successfully'});
	} catch (err) {
		res.status(400).send(`error creating customer >> ${err}`);
	}
})

router.put('/updateCustomer',async (req,res)=>{
	try {
        await customersController.updateCustomer(req.body.customerObj);
	    return res.status(200).send({status: 'ok', data: 'customer updated successfully'});
	} catch (err) {
		res.status(400).send(`error creating customer >> ${err}`);
	}
})

router.delete('/deleteCustomer' , async (req,res)=> {
    try{
        await customersController.deleteCustomer(req.body.customerObj);
	    return res.status(200).send({status: 'ok', data: 'customer deleted successfully'});
    }catch(err){
        res.status(400).send(err);    
    }
});



module.exports = router;