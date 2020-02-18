const express = require("express");
const server = express();
const nunjucks = require("nunjucks");

server.use(express.static('public'));

server.use(express.urlencoded({ extended: true }));

nunjucks.configure("./", {
    express: server,
    noCache: true
});


const donors = []

server.get("/", function(req, res) {
    return res.render("index.html", { donors });
});

server.post("/", function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    donors.push({
        name: name,
        blood: blood
    });

    return res.redirect("/");
});

server.listen(3000, function(){
    console.log("init server");
});