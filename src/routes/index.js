const express = require("express")
const multer = require('../app/middlewares/multer')
const routes = express.Router()

const generals = require("../app/controllers/generals")
const admin = require("../app/controllers/admins")
const chef = require("../app/controllers/chefs")

const SessionValidator = require('../app/validators/session')


const users = require('./users')

routes.use('/admin', users)


routes.get("/", generals.home)
routes.get("/sobre", generals.about )
routes.get("/receitas", generals.pagerecipes )
routes.get("/recipe/:id",generals.recipe)
routes.get("/chefs", generals.chef)



//route admin recipes
routes.get("/admin", function(req,res){return res.redirect("/admin/login")})
routes.get("/admin/recipes/create", SessionValidator.isLogged, admin.create)
routes.get("/admin/recipes", SessionValidator.isLogged, admin.index)
routes.get("/admin/recipes/:id", SessionValidator.isLogged, admin.show)
routes.get("/admin/recipes/:id/edit", SessionValidator.isLogged, SessionValidator.isAdminRecipe, admin.edit)
routes.post("/admin/recipes", SessionValidator.isLogged, SessionValidator.isAdminRecipe, multer.array("photos", 5), admin.post ) 
routes.put ("/admin/recipes", SessionValidator.isLogged, SessionValidator.isAdminRecipe, multer.array("photos", 5), admin.put)
routes.delete("/admin/recipes", SessionValidator.isLogged, admin.delete)


//route admin chef SessionValidator.isLogged,

routes.get("/admin/chefs", SessionValidator.isLogged, chef.index)
routes.get("/admin/chefs/create", SessionValidator.isLogged, SessionValidator.isAdmin, chef.create)
routes.get("/admin/chefs/:id", SessionValidator.isLogged, chef.show)
routes.get("/admin/chefs/:id/edit", SessionValidator.isLogged, SessionValidator.isAdmin, chef.edit)
routes.post("/admin/chefs", SessionValidator.isLogged, SessionValidator.isAdmin, multer.array("photos", 1), chef.post)
routes.put("/admin/chefs", SessionValidator.isLogged, SessionValidator.isAdmin, multer.array("photos", 1), chef.put)
routes.delete("/admin/chefs", SessionValidator.isLogged, SessionValidator.isAdmin, chef.delete)

module.exports = routes    
