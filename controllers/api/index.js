const router = require('express').Router();


router.use('/projects', require('./projects'));
router.use('/volunteers', require('./volunteers'));
router.use('/charity', require('./charity'));

module.exports = router;