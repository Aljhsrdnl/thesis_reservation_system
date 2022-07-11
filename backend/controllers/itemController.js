const Item = require('../models/Item');
// class APIfeatures{
//     constructor(query, queryString){
//         this.query = query;
//         this.queryString = queryString;
//     }

//     filtering(){

//         const queryObj = {...this.queryString }

//         console.log({before: queryObj})

//         const excludedFields = ['page','sort','limit']
//         excludedFields.forEach(el => delete(queryObj[el]))

//         console.log({after: queryObj})

//         let queryStr = JSON.stringify(queryObj)
//         queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' +  match ) 

//         console.log({queryStr})

//         this.query.find(JSON.parse(queryStr))
//         return this;
//     }
//     sorting(){
//         if(this.queryString.sort){
//             const sortBy = this.queryString.sort.split(',').join(' ')
//             this.query = this.query.sort(sortBy)

//         }else{
//             this.query = this.query.sort('-createdAt')
//         }
//         return this;
//     }
//     paginating(){
//         const page = this.queryString.page * 1 || 1
//         const limit = this.queryString.limit * 1 || 9
//         const skip = (page - 1) * limit
//         this.query = this.query.skip(skip).limit(limit)
//         return this;
//     }

// }
// const itemController = {
//     getItem: async(req, res) => {
       
//        try{
//             const features = new APIfeatures(Item.find(), req.query).filtering().sorting().paginating()
//             const items = await features.query
//             res.json({
//                 status: 'success',
//                 result: item.length,
//                 items: items
//         })

//        }catch(err){
//         return res.status(500).json({msg: err.message})
//        }
       
//     },
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

