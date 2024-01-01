const express = require('express');
const { request } = require('../../app');
const router = express.Router();


router.get('/', (req, res, next) => {
    let url = new URL("http://localhost:5001/test?name=test123");
    let params = new URLSearchParams(url.search);
    let total = params.get("name");
    res.status(200).json({
        total
    });
});

module.exports = router;