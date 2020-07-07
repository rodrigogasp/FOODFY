

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
    const recipe = data.recipes.find(function(recipe) {

        if (recipe.id == id) {
            return true
        }
    })
    if (!recipe) {
        return res.send("Recipe not found!")
    }
    return res.render("recipe", { item: recipe });
}


// ======== ADMIN ========== //



// index

exports.index = function (req, res) {

    return res.render("admin/index", {items: data.recipes})



}

//show 

exports.show = function (req, res) {

    const id = req.params.id
    const recipe = data.recipes.find(function(recipe) {

        if (recipe.id == id) {
            return true
        }
    })
    if (!recipe) {
        return res.send("Recipe not found!")
    }

    return res.render("admin/show", {item: recipe})
}


//create 

exports.create = function(req, res) {
    return res.render("admin/create")
}

// edit

exports.edit = function(req, res) {

    const {id} = req.params

    const findrecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })

    if (!findrecipe) return res.send("Receita não encontrada")

    const recipe = {
        ...findrecipe

    }

    return res.render("admin/edit", {item: recipe})
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

//put

exports.put = function(req, res) {

    const {id} = req.body
    let index= 0

    const findrecipe = data.recipes.find(function(recipe, findindex){
        if (id == recipe.id) {
            index = findindex
            return true
        }
    })

    if (!findrecipe) return res.send("Receita não encontrada")

    const recipe = {
        ...findrecipe,
        ...req.body,
    }

    data.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err){
        if(err) return res.send("write error")

        return res.redirect(`admin/recipes/${id}`)
    })



}

//delete

exports.delete = function(req,res) {

    const {id} = req.body

    const filteredrecipes = data.recipes.filter(function(recipe){
        return recipe.id != id
    })

    data.recipes = filteredrecipes

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("write file error!")

        return res.redirect(`admin/recipes`)
    })
}