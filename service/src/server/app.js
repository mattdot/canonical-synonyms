const express = require("express");
const path = require("path");
const proxy = require("./proxy");

//get env variables
const PORT = process.env.PORT || 1382;
const HOSTNAME = process.env.HOSTNAME || "localhost";

let app = express();
app.use(express.static(path.join(__dirname, "../../public")));
app.use("/api", require("./api"));
app.use("/", proxy);

app.listen(PORT, ()=> {
    console.log("listening on %s:%d", HOSTNAME, PORT);
});