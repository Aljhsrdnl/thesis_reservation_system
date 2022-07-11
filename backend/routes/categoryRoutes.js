const router = require('express').Router();
const categoryController = require('../controllers/categoryController')

router.get('/category', categoryController.getCategories)


module.exports = router;