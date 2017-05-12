const express = require("express");
const fetch = require("isomorphic-fetch");
const querystring = require('querystring');

const Synonyms = require("canonical-synonyms");

let app = express();
app.get("/:host/luis/v2.0/apps/:appId", (req, res)=> {
    const uri = `https://${req.params.host}/luis/v2.0/apps/${req.params.appId}?${querystring.stringify(req.query)}`;
    let syn = new Synonyms();

    console.log(uri);
    fetch(uri).then(
        (val) => {
            val.json().then(luisResult => {
                if(luisResult && luisResult.entities && luisResult.entities.length) {
                    syn.canonicalizeEntities(luisResult.entities, (error, result)=> {
                        console.log("Error = %j\nResult=%j", error, result);
                        luisResult.entities = result;
                        res.json(luisResult);
                    });
                }
            });
        },
        (reason) => {
            res.send(reason);
        }
    );
});

module.exports = app;