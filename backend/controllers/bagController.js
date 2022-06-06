const Bag = require('../models/Bag');
const Item = require('../models/Item')

module.exports.get_bag_items = async (req, res) => {
    console.log(`Paramaters: ${req.params.id}`)
    await Bag.findOne({
        user_ID: req.params.id
    })
        .then(bag => res.json(bag))
        .catch(err => console.error("NO BAG FOUND"))
}

module.exports.create_bag = async (req, res) => {
    const userID = req.params.id;
    const newBag = Bag.create({
        user_UD: userID,
        items_in_bag: [],
    })
}

module.exports.add_bag_item = async (req, res) => {
    const userID = req.params.id;
    const {productId, quantity, name} = req.body
    
    try {
        let bag = await Bag.findOne( { user_ID: userID });
        let item = await Item.findOne({ _id: productId });
       
        if(!item) {
            return res.status(404).send('Item NOT Found')
        }

        if (bag) {
            let itemIndex = bag.items_in_bag.findIndex(i => i.item_ID === productId)

            if(itemIndex > -1) { 
                let item_in_bag = bag.items_in_bag[itemIndex];
                item_in_bag.quantity += quantity;
                bag.items_in_bag[itemIndex] = item_in_bag;
                
            }
            else {
                const item_add = {
                    item_ID: productId,
                    name: name,
                    quantity: quantity
                }
                bag.items_in_bag.push(item_add)
                
            }
            bag = await bag.save();
        
            return res.status(201).send(bag)
        }
        //if current user does not have an existing bag
        else {
            const item_add = {
                item_ID: productId,
                name: name, 
                quantity: quantity
            }
            const newBag = Bag.create({
                user_ID: userID,
                items_in_bag: [item_add]
            })
           
            return res.status(201).send(newBag)
        }
    }

    catch(err) {
        console.error(err);
        return res.status(500).send('Something went wrong.')
    }
}

module.exports.delete_item = async (req, res) => {
    const { userID, itemID } = req.params;
    //search for the bag

    try {

        const bag = await Bag.findOne({ _id: userID });
        let itemIndex = bag.items_in_bag.findIndex(i => i.itemID == itemID);
        
        if(itemIndex > -1) {
            bag.items_in_bag.splice(itemIndex, 1)
        }
        bag = await bag.save()
        res.status(201).send(bag);
    }
    catch(err) {
        console.error(err);
        res.status(500).send('Something went wrong')
    }



}
