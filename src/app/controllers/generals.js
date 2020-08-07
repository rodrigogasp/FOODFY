


const General = require("../models/general")
const RecipeFile = require("../models/recipeFile")



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

       let results = await General.paginate(params)
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

        
        return res.render("general/home", {params, recipes, pagination, files})

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

       let results = await General.paginate(params)
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

        
        return res.render("general/recipes", {params, recipes, pagination, files})  


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
    chef(req, res){

        
    General.find(function(item){

        if(!item) return res.send("chef not found")

        return res.render("general/chefs", {item})


    })


    }

    
}  
