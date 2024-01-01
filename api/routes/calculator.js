const express = require('express');
const router = express.Router();


router.get('/:Number1-:Type-:Number2', (req, res, next) => {
    if(req.params.Type === '+') {
        const add = +req.params.Number1 + +req.params.Number2;
        res.status(200).json({
            add
        });
        console.log(`${req.params.Number1} + ${req.params.Number2} = ${add}`);
        
    } else if (req.params.Type === '-') {
        const subtract = req.params.Number1 - req.params.Number2;
        res.status(200).json({
            subtract
        });
        console.log(`${req.params.Number1} - ${req.params.Number2} = ${subtract}`);
        
    } else if (req.params.Type === '*') {
        const multiply = req.params.Number1 * req.params.Number2;
        res.status(200).json({
            multiply
        });
        console.log(`${req.params.Number1} * ${req.params.Number2} = ${multiply}`);
        
    } else if (req.params.Type === '_') {
        const devide = req.params.Number1 / req.params.Number2;
        res.status(200).json({
            devide
        });
        console.log(`${req.params.Number1} / ${req.params.Number2} = ${devide}`);
    } else {
    res.status(400).json({
        error: 'Invalaid equation picked'
    });
    console.log(`Invalaid equation picked ${req.params.Number1} ${req.params.Type} ${req.params.Number2}`);
    };
});


module.exports = router;