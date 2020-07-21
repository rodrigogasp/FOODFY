const express = require("express")

const routes = express.Router()

const generals = require("./app/controllers/generals")
const admin = require("./app/controllers/admins")
const chef = require("./app/controllers/chefs")




routes.get("/", generals.home)
routes.get("/sobre", generals.about )
routes.get("/receitas", generals.pagerecipes )
routes.get("/recipe/:id",generals.recipe)
routes.get("/chefs", generals.chef)



//route admin recipes
routes.get("/admin", function(req,res){return res.redirect("/admin/recipes")})
routes.get("/admin/recipes/create", admin.create)
routes.get("/admin/recipes", admin.index)
routes.get("/admin/recipes/:id", admin.show)
routes.get("/admin/recipes/:id/edit", admin.edit)
routes.post("/admin/recipes", admin.post ) 
routes.put ("/admin/recipes", admin.put)
routes.delete("/admin/recipes", admin.delete)


//route admin chef

routes.get("/admin/chefs", chef.index)
routes.get("/admin/chefs/create", chef.create)
routes.get("/admin/chefs/:id", chef.show)
routes.get("/admin/chefs/:id/edit", chef.edit)


routes.post("/admin/chefs", chef.post)
routes.put("/admin/chefs", chef.put)
routes.delete("/admin/chefs", chef.delete)

module.exports = routes    