const express = require("express");

let api = express();

api.get("/", (req, res) => {
    res.json({});
});

api.get("/entities/:entity", (req, res) => {
    res.json({ "hello" : req.params.entity });
});

api.get("/entities/:entity/canonicals/:canonical", (req, res) => {
    res.json({ "hello" : req.params.entity, "canonical" : req.params.canonical });
});


module.exports = api;