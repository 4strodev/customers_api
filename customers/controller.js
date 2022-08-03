const customerController = {};
const customerRepository = require('./repository');
const {CustomerNotFound} = require("./errors");

customerController.listCustomers = async (req, res) => {
    const customers = await customerRepository.getCustomers();

    return res.json(customers);
}

customerController.getCustomer = async (req, res) => {
    let id = res.locals.id;
    let customer = {};

    try {
        customer = await customerRepository.getCustomer(id);
    } catch (error) {
        if (error instanceof CustomerNotFound) {
            return res.status(400).json({
                err: error.message
            });
        }
        return res.status(500).json({
            err: "Error getting customer"
        })
    }

    return res.json(customer);
}

customerController.updateCustomer = async (req, res) => {
    const customer = req.body;
    const id = res.locals.id;
    let updatedCustomer = {};

    try {
        updatedCustomer = await customerRepository.updateCustomer(id, customer);
    } catch (error) {
        if (error instanceof CustomerNotFound) {
            return res.status(400).json({
                err: error.message,
            })
        }

        console.log(error.message)

        return res.status(500).json({
            err: "Error updating customer"
        })
    }

    return res.json(updatedCustomer)
}

customerController.createCustomer = async (req, res) => {
    const {name, last_name, phone, email} = req.body;

    let result = {};

    try {
        result = await customerRepository.createCustomer(name, last_name, phone, email);
    } catch (error) {
        return res.status(500).json({
            err: "Error creating customer",
        })
    }

    return res.json(result);
}

customerController.deleteCustomer = async (req, res) => {
    const customerId = res.locals.id;

    try {
        await customerRepository.deleteCustomer(customerId);

        return res.json({
            msg: "Customer deleted successfully",
        })
    } catch (error) {
        if (error instanceof CustomerNotFound) {
            return res.status(400).json({
                err: error.message
            })
        }

        return res.status(500).json({
            err: "Error deleting customer",
        })
    }
}

module.exports = customerController;