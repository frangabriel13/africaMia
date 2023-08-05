const { Router } = require('express');
const categoryRoute = require('./categoryRoute');
const productRoute = require('./productRoute');

const router = Router();

router.use('/', categoryRoute);
router.use('/', productRoute);


module.exports = router;