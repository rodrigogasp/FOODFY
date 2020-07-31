

const Admin = require("../models/admin")
const File = require("../models/file")
const RecipeFile = require("../models/recipeFile")
const { selectChefOptions } = require("../models/admin")


module.exports = {

    index(req, res) {


    Admin.all(function(items){

        return res.render("admin/recipes/index", {items})

    })
    
    },
    show (req, res) {
    
        Admin.find(req.params.id, function(items){

            if (!items) return res.send("Recipe not found!")


            Admin.selectChefOption(function(options){


                return res.render(`admin/recipes/show`, {items, options})

            })

        })

       
    },
    create(req, res) {

        Admin.selectChefOptions(function(items){


            return res.render("admin/recipes/create", {items})


        })

        


    },
    edit(req, res) {

        Admin.find(req.params.id, function(items){

            if (!items) return res.send("Recipe not found!") 


            Admin.selectChefOptions(function(options){


                return res.render("admin/recipes/edit", {items, options}) 

            })

        })


  
    },
    async post(req, res){

        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        if (req.files.length == 0)
            return res.send('Please, send at least one image')


        let results = await Admin.create(req.body)
        const recipeID = results.rows[0].id
        

        const filespromise = req.files.map(file => File.create({...file}))

        
       const resultsFile = await (await Promise.all(filespromise)).map(file => file.rows[0].id)


       resultsFile.map(id => RecipeFile.create(recipeID, id))

        return res.redirect("/admin/recipes")


     
    },
    put(req, res) {

        Admin.update(req.body, function(){

            return res.redirect(`/admin/recipes/${req.body.id}`)

        })
    
 
    
    
    },
    delete(req,res) {

        Admin.delete(req.body.id, function(){
            return res.redirect("/admin/recipes")

        })
    
      
    }


}