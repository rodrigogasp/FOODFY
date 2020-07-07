const recipes = require("../data")

const data = require("../data.json")

const fs = require("fs")


//home 

exports.home = function(req, res){


    return res.render("home")
},

//about
exports.about = function(req, res){
    return res.render("about")
},

//page recipes

exports.pagerecipes = function(req, res){
    return res.render("recipes", {items: data.recipes})
},

//page recipe

exports.recipe = function(req, res) {
    const id = req.params.id
    const recipe = recipes.find(function(recipe) {

        if (recipe.id == id) {
            return true
        }
    })
    if (!recipe) {
        return res.send("Recipe not found!")
    }
    return res.render("recipe", { item: recipe });
}


//create 

exports.create = function(req, res) {
    return res.render("admin/create")
}



//post 

exports.post = function(req, res){

    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key]== "") {

            return res.send("Please, fill all fields!")
        }
    }

    let {
        name,
        author,
        image_url, 
        ingredients, 
        preparation, 
        informations
    } = req.body



   let id= 1
    const lastrecipe = data.recipes[data.recipes.length -1]

    if(lastrecipe) {
       id= lastrecipe.id + 1
   }
    


    data.recipes.push({
        id,
        name,
        author,
       image_url, 
        ingredients, 
        preparation, 
        informations
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("write file error!")

        return res.redirect("admin/create")
    })
}