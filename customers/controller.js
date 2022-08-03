const customerController = {};
const customerRepository = require('./repository');

customerController.getUser = (req, res) => {
    customerRepository.getUser();
    return res.send("")
}

module.exports = customerController;