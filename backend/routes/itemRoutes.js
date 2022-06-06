const itemController = require('../controllers/itemController')
const router = require('express').Router();

router.get('/items', itemController.getItem)
router.post('/items', itemController.createItem)
router.delete('/items/:id', itemController.deleteItem)
router.put('/items/:id',itemController.updateItem)

module.exports = router;

// const itemsController = require('../controllers/itemController')
// const { Router } = require('express');
// const router = Router();

// router.get('/items', itemsController.get_all_items);
// router.get('/items/:id', itemsController.get_item_by_ID);

// module.exports = router;