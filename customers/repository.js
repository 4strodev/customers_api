const customerRepository = {};
const dbPool = require("../services/databse.service");
const {CustomerNotFound} = require("./errors");

customerRepository.getCustomers = async () => {
    let customers = [];

    try {
        [customers, _] = await dbPool.query("SELECT * FROM customers");

        console.log(customers);
    } catch (error) {
        throw error;
    }

    return customers;
}

customerRepository.getCustomer = async (id) => {
    let rows = []
    try {
        [rows, _] = await dbPool.query("SELECT * FROM customers WHERE id = ?", [id]);
        if (rows.length === 0) {
            throw new CustomerNotFound();
        }
    } catch (error) {
        throw error;
    }

    const customer = rows[0];

    return customer;
}

customerRepository.createCustomer = async (name, last_name, phone, email) => {
    const query = `INSERT INTO customers
                   SET name = ? , last_name = ? , phone = ? , email = ?`;
    let result = [];

    try {
        [result, _] = await dbPool.query(query, [name, last_name, phone, email]);
    } catch (error) {
        throw error;
    }

    const insertedId = result.insertId

    return {
        id: insertedId,
        name,
        last_name,
        phone,
        email
    };
}

customerRepository.updateCustomer = async (id, customer_data) => {
    const select_query = `SELECT *
                          FROM customers
                          WHERE id = ?`;
    let rows = [];

    try {
        [rows, _] = await dbPool.query(select_query, [id]);
    } catch (error) {
        throw error
    }

    if (rows.length === 0) {
        throw new CustomerNotFound();
    }

    const customer = rows[0];

    customer_data = {
        name: customer_data.name ? customer_data.name : customer.name,
        last_name: customer_data.last_name ? customer_data.last_name : customer.last_name,
        phone: customer_data.phone ? customer_data.phone : customer.phone,
        email: customer_data.email ? customer_data.email : customer.email,
    }

    console.log(customer_data);

    const update_query = `UPDATE customers
                          SET name      = ?,
                              last_name = ?,
                              phone     = ?,
                              email     = ?
                          WHERE id = ?`;

    try {
        await dbPool.query(update_query,
            [customer_data.name,
                customer_data.last_name,
                customer_data.phone,
                customer_data.email, id]);

        return customer_data;
    } catch (error) {
        throw error;
    }
}

customerRepository.deleteCustomer = async (id) => {
    const query = `DELETE
                   FROM customers
                   WHERE id = ?`;

    try {
        const [result, _] = await dbPool.query(query, [id]);

        if (result.affectedRows == 0) {
            throw new CustomerNotFound();
        }
    } catch (error) {
        throw error;
    }
}

module.exports = customerRepository;