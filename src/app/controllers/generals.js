


const General = require("../models/general")



module.exports = {

    home(req, res){

        General.all(function(item){

            return res.render("general/home", {item})



        })

    },
    about(req, res){
        return res.render("general/about")
    },
    pagerecipes(req, res){

        General.all(function(item){

            return res.render("general/recipes", {item})

        })


    },
    recipe(req, res){

        General.show(req.params.id, function(item){

            if(!item) return res.send("recipe not found")

            return res.render("general/recipe", {item})



        }) 

    },
    chef(req, res){

        
    General.find(function(item){

        if(!item) return res.send("chef not found")

        return res.render("general/chefs", {item})


    })


    }

    
}  
