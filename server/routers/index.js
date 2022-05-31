const Router = require('express').Router;
const userRouter = require('./user-router')

/*
const titleRouter = require('./TitleRouter')
const publisherRouter = require('./PublisherRouter')
const categoryRouter = require('./CategoryRouter')
const bookSetRouter = require('./BookSetRouter')
const orderRouter = require('./OrderRouter')
*/

const router = new Router();

router.use('/user', userRouter);
/*
router.use('/title', titleRouter);
router.use('/publisher', publisherRouter);
router.use('/category', categoryRouter);
router.use('/bookset', bookSetRouter);
router.use('/order', orderRouter);
*/
module.exports = router;