const Bag = require('../models/Bag');
const Item = require('../models/Item')

module.exports.get_bag_items = async (req, res) => {
    await Bag.findOne({
        _id: req.params.id
    })
        .then(bag => res.json(bag))
        .catch(err => console.error(err))
}

module.exports.add_bag_item = async (req, res) => {
    const userID = req.params.id;
    const { quantity, itemID } = req.body;

    try {
        let bag = await Bag.findOne( { _id: userID });
        let item = await Item.findOne({ _id: itemID });

        if(!item) {
            res.status(404).send('Item NOT Found')
        }

        if (cart) {
            let itemIndex = bag.items_in_bag.findIndex(i => i.itemID == itemID)

            if(itemIndex > -1) { 
                let item_in_bag = bag.items_in_bag[itemIndex];
                item_in_bag.quantity += quantity;
                bag.items_in_bag[itemIndex] = item_in_bag;
            }
            else {
                bag.items_in_bag.push({ itemID, name, quantity})
            }
            bag = await bag.save();
            return res.status(201).send(bag)
        }
        //if current user does not have an existing bag
        else {
            const newBag = Bag.create({
                userID,
                items_in_bag: [{ itemID, name, quantity }]
            })
            return res.status(201).res.send(newBag)
        }
    }

    catch(err) {
        console.error(err);
        res.status(500).send('Something went wrong.')
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
