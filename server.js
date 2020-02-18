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


const donors = [
    {
        name: "Diego Fernandes",
        blood: "AB+"
    },
    {
        name: "Diego Fernandes",
        blood: "AB+"
    },
    {
        name: "Diego Fernandes",
        blood: "AB+"
    },
    {
        name: "Diego Fernandes",
        blood: "AB+"
    }
]

server.get("/", function(req, res) {
    return res.render("index.html", { donors });
});