const ordersModel = require('../models/ordersSchema');

const getAllOrders = function(){
    return new Promise((resolve, reject) => {
        ordersModel.find({}, function (err, orders) {
            if(err){
                return reject(err);
            }
            resolve(orders);
        });
    })
}

const getAllCustomerOrders = function(customerId){
    return new Promise((resolve, reject) => {
        ordersModel.find({CustomerId: customerId}, function (err, orders) {
            if(err){
                return reject(err);
            }
            resolve(orders);
        });
    })
}

const createOrder = async function(orderObj){
    // validateing data
    if(!orderObj && !orderObj.OrderId && !orderObj.OrderItems.length){
        throw new Error (`error creating order missing properties >> ${orderObj}`);
    }
    
    //attach date property
    orderObj.OrderDate = Date.now()

    try {
		// storing our user data into database
		await ordersModel.create(orderObj);

	    return {status: 'ok', data: 'order created successfully'};
	} catch (err) {
		throw new Error (`error creating order >> ${orderObj} err >> ${err}`);
	}
}

function generateUpdatedObject(orderObj){
    let updatedObjFields = {}
    for(let property of ['OrderAmount', 'OrderItems', 'CustomerId']){
        if (orderObj[property]){
            updatedObjFields[property] = orderObj[property];
        }
    }
    return updatedObjFields;
}

const updateOrder = async function(orderObj){
    console.log('order >> ',orderObj);

    if(!orderObj && !orderObj.OrderId && !orderObj.OrderAmount && !orderObj.OrderItems){
        throw new Error (`error creating order missing properties >> ${orderObj}`);
    }

    let updateObj = generateUpdatedObject(orderObj);
    console.log('updated >> ',updateObj);
    console.log('ord >> ',orderObj.OrderId);

    ordersModel.findOneAndUpdate({OrderId: orderObj.OrderId} ,updateObj, function (err, result) {
        if(err){
            throw new Error(err);
        }
        return;
    } );
} 

const deleteOrder = async function(orderId){

    if(!orderId){
        throw new Error (`error deleteing order missing properties >> ${orderId}`);
    }

    ordersModel.findOneAndDelete({OrderId: orderId} , function (err, result) {
        if(err){
            throw new Error(err);
        }
        return;
    });
}

const deleteAllcustomerOrders = async function(customerId){

    if(!customerId){
        throw new Error (`error deleteing order missing properties >> ${customerId}`);
    }

    ordersModel.deleteMany({CustomerId: customerId} , function (err, result) {
        if(err){
            throw new Error(err);
        }
        return;
    });
} 

module.exports = {
    getAllOrders,
    updateOrder,
    createOrder,
    deleteOrder,
    getAllCustomerOrders,
    deleteAllcustomerOrders
}