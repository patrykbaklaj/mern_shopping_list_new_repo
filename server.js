const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const items = require("./routes/api/items");
const users = require('./routes/api/users');
const config = require("config");

const app = express();

//body-parser midleware
app.use(express.json());

// const db = process.env.MONGO_URI;
const db = config.get("mongoURI");

// connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("MongoDB Connected....."))
    .catch(err => console.log(err));

//use routes
app.use("/api/items", items);
app.use("/api/users", users);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
