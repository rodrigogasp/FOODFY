const express = require("express")
const multer = require('../app/middlewares/multer')
const routes = express.Router()

const generals = require("../app/controllers/generals")
const admin = require("../app/controllers/admins")
const chef = require("../app/controllers/chefs")



const users = require('./users')

routes.use('/admin', users)


routes.get("/", generals.home)
routes.get("/sobre", generals.about )
routes.get("/receitas", generals.pagerecipes )
routes.get("/recipe/:id",generals.recipe)
routes.get("/chefs", generals.chef)



//route admin recipes
routes.get("/admin", function(req,res){return res.redirect("/admin/login")})
routes.get("/admin/recipes/create", admin.create)
routes.get("/admin/recipes", admin.index)
routes.get("/admin/recipes/:id", admin.show)
routes.get("/admin/recipes/:id/edit", admin.edit)
routes.post("/admin/recipes", multer.array("photos", 5), admin.post ) 
routes.put ("/admin/recipes", multer.array("photos", 5), admin.put)
routes.delete("/admin/recipes", admin.delete)


//route admin chef

routes.get("/admin/chefs", chef.index)
routes.get("/admin/chefs/create", chef.create)
routes.get("/admin/chefs/:id", chef.show)
routes.get("/admin/chefs/:id/edit", chef.edit)
routes.post("/admin/chefs", multer.array("photos", 1), chef.post)
routes.put("/admin/chefs", multer.array("photos", 1), chef.put)
routes.delete("/admin/chefs", chef.delete)


module.exports = routes    