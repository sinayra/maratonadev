const express = require("express");
const server = express();
const nunjucks = require("nunjucks");

server.use(express.static('public'));

server.use(express.urlencoded({ extended: true }));

const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'donation'
})

nunjucks.configure("./", {
    express: server,
    noCache: true
});

server.get("/", function(req, res) {
    const query = `SELECT * FROM donors`;

    db.query(query, function(err, result){
        if(err){
            console.log(err);
            return res.send("erro no banco de dados");
        }
        const donors = result.rows;
        return res.render("index.html", { donors });
    });
});

server.post("/", function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    if(name == "" || email == "" || blood == ""){
        return res.send("Todos os campos são obrigatórios");
    }

    const query = `INSERT INTO donors("name", "email", "blood") 
                VALUES ($1, $2, $3)`;
    const values = [name, email, blood];
    db.query(query, values, function(err){
        if(err){
            console.log(err);
            return res.send("erro no banco de dados");
        }

        return res.redirect("/");
    });
});

server.listen(3000, function(){
    console.log("init server");
});