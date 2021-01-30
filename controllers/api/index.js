const router = require('express').Router();


router.use('/projects', require('./projects'));
router.use('/volunteers', require('./volunteers'));

module.exports = router