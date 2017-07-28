const express = require('express');
const jsonParser = require('body-parser').json();

const router = express.Router();
router.use(jsonParser);

router.get('/names/:name', (req, res) => {
    console.log(req.params.name);
    res.json({thing: req.params.name});
});


router.put('/names/:name', (req, res) => {
    console.log(req.params.name);
    res.json({thing: req.params.name});
});


router.get('/high-scores', (req, res) => {
    console.log(req.params.name);
    res.json({thing: 'HI, HI, HIIIIIIIIIIIIIIII'});
});

module.exports = {router};
