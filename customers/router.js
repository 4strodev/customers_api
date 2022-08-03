const express = require('express');
const router = express.Router();
const { listCustomers, getCustomer, createCustomer, deleteCustomer, updateCustomer } = require("./controller");
const { validateId } = require("./middlewares");

/* GET users listing. */
router.get('/', listCustomers);

router.get('/:id', validateId, getCustomer);

router.put('/:id', validateId, updateCustomer);

router.post('/', createCustomer);

router.delete('/:id', validateId, deleteCustomer);

module.exports = router;