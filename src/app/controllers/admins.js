

const Admin = require("../models/admin")
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
    post(req, res){

        Admin.create(req.body, function(items){

            return res.redirect(`/admin/recipes`)
        })

     
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