const router = require('express').Router();


router.use('/projects', require('./projects'));
router.use('/volunteers', require('./volunteers'));
router.use('/charity', require('./charity'));
router.use('/teams', require('./teams'));
router.use('/tasks', require('./tasks'));


module.exports = router;