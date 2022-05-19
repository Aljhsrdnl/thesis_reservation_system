const Bag = require('../models/Bag');
const Item = require('../models/Item')

module.exports.get_bag_items = (req, res) => {
    Bag.findOne({
        _id: req.params.id
    })
        .then(bag => res.json(bag))
        .catch(err => console.error(err))
}

