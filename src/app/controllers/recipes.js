


const fs = require("fs")



module.exports = {

    home(req, res){

        return res.render("general/home")
    },
    about(req, res){
        return res.render("general/about")
    },
    pagerecipes(req, res){
        return res.render("general/recipes")
    },
    recipe(req, res) {
        const id = req.params.id
        const recipe = data.recipes.find(function(recipe) {
    
            if (recipe.id == id) {
                return true
            }
        })
        if (!recipe) {
            return res.send("Recipe not found!")
        }
        return res.render("general/recipe");
    }
    
}
