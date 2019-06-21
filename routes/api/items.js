const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")

// Item model
const Item = require("../../models/Item");


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
// @access   Private

router.post("/", auth, (req, res) => {
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
// @access   Private

router.delete("/:id", auth, (req, res) => {
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
