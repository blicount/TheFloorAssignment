const customersModel = require('../models/customersSchema');


const getAllCustomers = function(){
    return new Promise((resolve, reject) => {
        customersModel.find({}, function (err, users) {
            if(err){
                return reject(err);
            }
            resolve(users);
        });
    })
}

const createCustomer = async function(customerObj){
    //validating data
    console.log('2>> ',customerObj);
    if(!customerObj && !customerObj.CustomerId && !customerObj.CustomerName && !customerObj.CustomerAddress){
        throw new Error (`error creating order missing properties >> ${customerObj}`);
    }
    try {
		// storing our user data into database
		await customersModel.create({
            CustomerId: customerObj.CustomerId,
			CustomerName : customerObj.CustomerName,
			CustomerAddress: customerObj.CustomerAddress
		})

	    return {status: 'ok', data: 'customer created successfully'};
	} catch (err) {
		throw new Error (`error creating customer >> ${customerObj} err >> ${err}`);
	}
}

function generateUpdatedObject(customerObj){
    let updatedObjFields = {}
    for(let property of ['CustomerName', 'CustomerAddress']){
        if (customerObj[property]){
            updatedObjFields[property] = customerObj[property];
        }
    }
    return updatedObjFields;
}

const updateCustomer = async function(customerObj){
    console.log('cus >> ',customerObj);

    if(!customerObj && !customerObj.CustomerId && !customerObj.CustomerName && !customerObj.CustomerAddress){
        throw new Error (`error creating order missing properties >> ${customerObj}`);
    }

    let updateObj = generateUpdatedObject(customerObj);
    console.log('updated >> ',updateObj);

    customersModel.findOneAndUpdate({CustomerId: customerObj.CustomerId} ,updateObj, function (err, result) {
        if(err){
            throw new Error(err);
        }
        return;
    } );
} 

const deleteCustomer = async function(customerObj){
    console.log(customerObj);
    if(!customerObj && !customerObj.CustomerId){
        throw new Error (`error creating order missing properties >> ${customerObj}`);
    }

    customersModel.findOneAndDelete({CustomerId: customerObj.CustomerId} , function (err, result) {
        if(err){
            throw new Error(err);
        }
        return;
    });
} 

module.exports = {
    getAllCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
}