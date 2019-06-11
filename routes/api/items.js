const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");

// Item model
// @route    GET api/items
// @desc     Get All items
// @access   Public

router.get("/", (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => {
            res.json(items);
        });
});

// @route    POST api/items
// @desc     Create an item
// @access   Public

router.post("/", (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save((err, item) => {
        if (err) {
            console.log(err);
        } else {
            res.json(item);
        }
    });
});

// @route    Delete api/items/:id
// @desc     Delete an item
// @access   Public

router.delete("/:id", (req, res) => {
    Item.findByIdAndDelete(req.params.id, (err, deletedItem) => {
        if (err) {
            console.log(err);
            res.status(404);
            res.send("No such id");
            // json({error: 'canot find requested item id'});
        } else {
            console.log(deletedItem);
            res.json({ success: true });
        }
    });
});

module.exports = router;
