const express = require("express")
const nunjucks = require("nunjucks")

const server = express()

server.listen(3000, function(){
    console.log("server is running")
}) 
//const courses = require("./data")

server.use(express.static("public"))

server.set("view engine", "njk")

server.get("/", function(req, res){
    return res.render("home")
})

server.get("/sobre", function(req, res){
    return res.render("about")
})

server.get("/receitas", function(req, res){
    return res.render("recepies")
})

nunjucks.configure("views", {
    express:server,
    autoescape: false
})