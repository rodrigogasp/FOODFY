


const General = require("../models/general")



module.exports = {

    home(req, res){

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1)
  
        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes) {
  
                const pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
                }
                return res.render('general/home', { recipes, pagination, filter })
            }
        }
        General.paginate(params) 
    },
    about(req, res){
        return res.render("general/about")
    },
    pagerecipes(req, res){

      //  General.all(function(item){

           // return res.render("general/recipes", {item})

      //  })


      let { filter, page, limit } = req.query

      page = page || 1
      limit = limit || 9
      let offset = limit * (page - 1)

      const params = {
          filter,
          page,
          limit,
          offset,
          callback(recipes) {

              const pagination = {
                  total: Math.ceil(recipes[0].total / limit),
                  page
              }
              return res.render('general/recipes', { recipes, pagination, filter })
          }
      }
      General.paginate(params)  


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
