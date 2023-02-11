const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/knockknock', function (req, res, next) {
    res.status(200).send('Welcome to  Medical bill upload service');
});

module.exports = router;