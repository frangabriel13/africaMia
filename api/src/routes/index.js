const { Router } = require('express');
const categoryRoute = require('./categoryRoute');
const productRoute = require('./productRoute');
const imageRoute = require('./imageRoute');
const sizeRoute = require('./sizeRoute');
const colorRoute = require('./colorRoute');
const variationRoute = require('./variationRoute');

const router = Router();

router.use('/', categoryRoute);
router.use('/', productRoute);
router.use('/', imageRoute);
router.use('/', sizeRoute);
router.use('/', colorRoute);
router.use('/', variationRoute);


module.exports = router;