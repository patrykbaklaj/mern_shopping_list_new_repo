const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

// USER model
// @route    GET api/users
// @desc     Register new user
// @access   Public

router.post("/", (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
        return res.status(400).send("Please enter all fields");
    }

    // Check for existing user
    User.findOne({ email }, (err, foundedUser) => {
        if (foundedUser) {
            return res.status(500).send("User with given email already exists");
        }

        const newUser = new User({
            name,
            email,
            password
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                // Store hash in your password DB.
                if (err) throw err;

                newUser.password = hash;
                newUser.save((err, savedUser) => {
                    res.send({
                        user: {
                            id: savedUser.id,
                            name: savedUser.name,
                            email: savedUser.email
                        }
                    });
                });
            });

            // res.send(newUser);
        });
    });
});

module.exports = router;
