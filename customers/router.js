const express = require('express');
const router = express.Router();
const { getUser } = require("./controller")

/* GET users listing. */
router.get('/', getUser);

router.get('/:id', (req, res) => {
    res.send('TODO send single customer');
})

module.exports = router;
