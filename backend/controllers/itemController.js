const Item = require('../models/Item');

module.exports.get_all_items = (req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(err => console.error(`Error: ${err}`))
}

module.exports.get_item_by_ID = (req, res) => {
    Item.findOne({ id: req.params.id }, {})
        .then(item => { res.json(item) })
        .catch(err => console.error(err))
}