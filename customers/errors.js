class CustomerNotFound extends Error {
    constructor() {
        super("Customer not found");
        this.name = "CustomerNotFound";
    }
}

class InvalidId extends Error {
    constructor() {
        super("Invalid id");
        this.name = "InvalidId";
    }
}

module.exports = {
    CustomerNotFound,
    InvalidId
}