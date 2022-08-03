const middlewares = {}

const { InvalidId } = require("./errors");

middlewares.validateId = (req, res, next) => {
    let id = req.params.id;

    try {
        const parsed_id = parseInt(id);

        console.log(typeof parsed_id, parsed_id);

        if (isNaN(parsed_id)) {
            throw new InvalidId();
        }

    } catch (err) {
        if (err instanceof InvalidId) {
            return res.json({
                err: "Id must be a number"
            })
        }
    }

    res.locals.id = id;

    return next();
}

module.exports = middlewares;