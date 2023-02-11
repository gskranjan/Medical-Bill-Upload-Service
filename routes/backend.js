const express = require('express');
const router = express.Router();
const bills = require("../controllers/bills.js");

router.get('/items', async (req, res) => {
    try {
        const result = bills.getItems();
        if (result.success) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send(result);
        }
    }
    catch (err) {
        const error = {
            function: "router",
            err,
            message: 'router failed for get items'
        };
        console.error('[Error] Get item details API failed with Error message: ' + err.message)
        res.status(500).send({ success: false, message: 'Something went wrong!', error });
    }
});

router.post('/items', async (req, res) => {
    try {
        const result = bills.createMedicalBills(req.body);
        if (result.success) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send(result);
        }
    }
    catch (err) {
        const error = {
            function: "router",
            err,
            message: 'router failed for post items'
        };
        console.error('[Error] Post item details API failed with Error message: ' + err.message)
        res.status(500).send({ success: false, message: 'Something went wrong!', error });
    }
});

router.post('/bulk-items', async (req, res) => {
    try {
        const result = bills.createMedicalBillsBulk(req.body);
        if (result.success) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send(result);
        }
    }
    catch (err) {
        const error = {
            function: "router",
            err,
            message: 'router failed for post items'
        };
        console.error('[Error] Post Bulk items details API failed with Error message: ' + err.message)
        res.status(500).send({ success: false, message: 'Something went wrong!', error });
    }
});

module.exports = router;