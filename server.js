const express = require("express");
const server = express();
const nunjucks = require("nunjucks");

server.listen(3000, function(){
    console.log("init server");
});

server.use(express.static('public'));

nunjucks.configure("./", {
    express: server
});

server.get("/", function(req, res) {
    return res.render("index.html");
});