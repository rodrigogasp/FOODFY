

const Admin = require("../models/admin")


module.exports = {

    index(req, res) {

    Admin.all(function(items){

        return res.render("admin/index", {items})

    })
    
    },
    show (req, res) {
    
        Admin.find(req.params.id, function(item){

            if (!item) return res.send("Recipe not found")

            return res.render(`admin/show`, {item})

        })

       
    },
    create(req, res) {


        return res.render("admin/create")
    },
    edit(req, res) {

        Admin.find(req.params.id, function(item){

            if (!item) return res.send("Recipe not found")

            return res.render(`admin/edit`, {item})

        })
    
       return
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
    
    return
    
    
    },
    delete(req,res) {

        Admin.delete(req.body.id, function(){
            return res.redirect("/admin")

        })
    
        return
    }


}