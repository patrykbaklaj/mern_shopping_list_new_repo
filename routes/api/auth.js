const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route    POST api/auth
// @desc     Auth user
// @access   Public

router.post("/", (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
        res.status(400).send({ msg: "Please enter all fields" });
    }

    // Search for an user
    User.findOne({ email }, (err, foundUser) => {
        if (err) throw err;

        if (!foundUser) {
            return res.status(400).send({
                msg: "User with given email doesn't exists"
            });
        }

        // Validate password
        bcrypt.compare(password, foundUser.password, (err, isMatch) => {
            if (!isMatch) {
                return res.status(400).send({ msg: "Invalid credentials" });
            }

            jwt.sign(
                { id: foundUser.id },
                config.get("jwtSecret"),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.send({
                        token,
                        user: {
                            id: foundUser.id,
                            name: foundUser.name,
                            email: foundUser.email
                        }
                    });
                }
            );
        });
    });
});

// @route    GET api/auth/user
// @desc     GET User Data
// @access   Private

router.get("/user", auth, (req, res) => {
    User.findById(req.user.id)
        .select("-password")
        .exec((err, foundUser) => {
            if (err) throw err;
            res.send(foundUser);
        });
});

module.exports = router;
