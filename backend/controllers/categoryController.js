const Category = require('../models/Category')

const categoryController = {
    getCategories: async(req, res) =>{
        try{
            const category = await Category.find()
            res.json(category)
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    }   
}

module.exports = categoryController