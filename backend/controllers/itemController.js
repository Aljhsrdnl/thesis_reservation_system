const Item = require('../models/Item');

const itemController = {
    getItem: async(req, res) => {
       
        Item.find()
            .then(items => res.json(items))
            .catch(err => console.error(err))
    },
    get_one_item: async(req, res) => {
        const id = req.params.id;
        Item.findById(id)
            .then(item => res.json(item))
            .catch(err => console.error(err))
    },
    createItem: async(req, res) => {
        try{
            res.json('test')
        }catch(err){
            res.status(500).json({msg:"error"});        
        }
    },
    deleteItem: async(req, res) => {
        try{
            res.json('test')
        }catch(err){
            res.status(500).json({msg:"error"});        
        }
    },
    updateItem: async(req, res) => {
        try{
            res.json('test')
        }catch(err){
            res.status(500).json({msg:"error"});        
        }
    },
}

module.exports = itemController
// module.exports.get_all_items = (req, res) => {
//     Item.find()
//         .then(items => res.json(items))
//         .catch(err => console.error(`Error: ${err}`))
// }

// module.exports.get_item_by_ID = (req, res) => {
//     Item.findOne({ id: req.params.id }, {})
//         .then(item => { res.json(item) })
//         .catch(err => console.error(err))
// }

