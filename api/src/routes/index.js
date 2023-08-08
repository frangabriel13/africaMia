const { Router } = require('express');
const categoryRoute = require('./categoryRoute');
const productRoute = require('./productRoute');
const imageRoute = require('./imageRoute');

const router = Router();

router.use('/', categoryRoute);
router.use('/', productRoute);
router.use('/', imageRoute);


module.exports = router;