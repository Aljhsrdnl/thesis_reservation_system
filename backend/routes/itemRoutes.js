const itemsController = require('../controllers/itemController')
const { Router } = require('express');
const router = Router();

router.get('/items', itemsController.get_all_items);
router.get('/items/:id', itemsController.get_item_by_ID);

module.exports = router;