const itemController = require('../controllers/itemController')
const router = require('express').Router();

router.get('/items', itemController.getItem)
router.get('/item/:id', itemController.get_one_item)
router.post('/item', itemController.createItem)
router.delete('/item/:id', itemController.deleteItem)
router.put('/item/:id',itemController.updateItem)

module.exports = router;

// const itemsController = require('../controllers/itemController')
// const { Router } = require('express');
// const router = Router();

// router.get('/items', itemsController.get_all_items);
// router.get('/items/:id', itemsController.get_item_by_ID);

// module.exports = router;