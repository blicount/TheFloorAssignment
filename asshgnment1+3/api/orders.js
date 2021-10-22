
const express   = require('express');
const router    = express.Router();
const ordersController = require('../controllers/ordersCtl');


router.get('/' , async (req,res)=> {
    try{
        let ordersList = await ordersController.getAllOrders();
        res.status(200).send(ordersList)
    }catch(err){
        res.status(400).send(err);    
    }
});

router.post('/getAllCustomerOrders' , async (req,res)=> {
    try{
        let ordersList = await ordersController.getAllCustomerOrders(req.body.customerId);
        res.status(200).send(ordersList)
    }catch(err){
        res.status(400).send(err);    
    }
});

router.post('/createOrder',async (req,res)=>{

	try {
        await ordersController.createOrder(req.body.orderObj);
	    return res.status(200).send({status: 'ok', data: 'order created successfully'});
	} catch (err) {
		res.status(400).send(`error creating order >> ${err}`);
	}
})



router.put('/updateOrder' , async (req,res)=> {
    try{
        await ordersController.updateOrder(req.body.orderObj);
	    return res.status(200).send({status: 'ok', data: 'order updated successfully'});
    }catch(err){
        res.status(400).send(err);    
    }
});

router.delete('/deleteOrder' , async (req,res)=> {
    try{
        await ordersController.deleteOrder(req.body.orderId);
	    return res.status(200).send({status: 'ok', data: 'order deleted successfully'});
    }catch(err){
        res.status(400).send(err);    
    }
});

router.delete('/deleteAllcustomerOrders' , async (req,res)=> {
    try{
        await ordersController.deleteAllcustomerOrders(req.body.customerId);
	    return res.status(200).send({status: 'ok', data: 'customer orders deleted successfully'});
    }catch(err){
        res.status(400).send(err);    
    }
});

module.exports = router;
