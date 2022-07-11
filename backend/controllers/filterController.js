const Item = require('../models/itemData');


exports.searchByQueryType = async (req, res) => {
	const { type, query } = req.body;

	try {
		let item;

		switch (type) {
			case 'text':
				item = await Item.find({ $text: { $search: query } });
				break;
			case 'category':
				item = await Item.find({ itemCategory: query });
				break;
		}

		if (!item.length > 0) {
			item = await Item.find({});
		}

		res.json({ item });
	} catch (err) {
		console.log(err, 'filter Controller.searchByQueryType error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};
