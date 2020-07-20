const express = require("express")

const routes = express.Router()

const recipes = require("./app/controllers/recipes")
const admin = require("./app/controllers/admins")
const chef = require("./app/controllers/chefs")




routes.get("/", recipes.home)
routes.get("/sobre", recipes.about )
routes.get("/receitas", recipes.pagerecipes )
routes.get("/receita/:id", recipes.recipe)



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