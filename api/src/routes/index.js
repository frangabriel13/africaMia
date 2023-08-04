const { Router } = require('express');
const categoryRoute = require('./categoryRoute');

const router = Router();

router.use('/', categoryRoute);


module.exports = router;