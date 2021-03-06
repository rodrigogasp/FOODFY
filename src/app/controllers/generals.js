


const General = require("../models/general")
const RecipeFile = require("../models/recipeFile")
const File = require("../models/File")




module.exports = {

    async home(req, res){


        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1)
  
        const params = {
            filter,
            page,
            limit,
            offset
        }

       let results = await General.paginateHome(params)
       const recipes = results.rows


        const pagination = {
            total: Math.ceil(recipes[0].total / limit),
            page
        }

        results = await RecipeFile.all()
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        
        return res.render("general/home", {params, filter, recipes, pagination, files})

    },
    about(req, res){
        return res.render("general/about")
    },
   async pagerecipes(req, res){
    
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1)
  
        const params = {
            filter,
            page,
            limit,
            offset
        }

       let results = await General.paginateRecipes(params) 
       const recipes = results.rows

        if(filter && recipes.length == 0) return res.send('Recipe not found')
          

        const pagination = {
            total: Math.ceil(recipes[0].total / limit), 
            page
        }

        results = await RecipeFile.all()
        const files = results.rows.map(file => ({ 
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        
        return res.render("general/recipes", {params, filter, recipes, pagination, files})  


    },
    async recipe(req, res){

        let results = await General.show(req.params.id)

        const item = results.rows[0]

        if(!item) return res.send("recipe not found")

        results = await RecipeFile.showSinglefile(req.params.id)
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render("general/recipe", {item, files})


    },
    async chef(req, res){

        
    let results = await General.find()
    const item = results.rows

    if(!item) return res.send("chef not found")

    results = await File.getAllfiles()
    const allfiles = results.rows

    const files = results.rows.map(file => ({
    ...file,
    src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))

    return res.render("general/chefs", {item, files})


    



    
}  
}