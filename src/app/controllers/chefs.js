
const Chef = require("../models/chef")


module.exports = {


async index(req, res) {

let results = await Chef.all()
const items = results.rows

return res.render("admin/chefs/index", {items})



},
create(req, res) {


return res.render("admin/chefs/create")


},
async post(req, res){

let results = await Chef.create(req.body)



return res.redirect(`/admin/chefs`)




},
show(req, res){

  Chef.showChef(req.params.id, function(items){

    if(!items) return res.send("Chef not found!")


    Chef.find(req.params.id, function(chef){

        return res.render("admin/chefs/show", {items, chef}) 


    })



  })

},
edit(req, res) {

    Chef.showChef(req.params.id, function(items){

        if(!items) return res.send("Chef not found!")
    
    
        Chef.find(req.params.id, function(chef){
    
            return res.render("admin/chefs/edit", {items, chef}) 
    
    
        })
    
    
    
      })
  

},
put(req, res) {

    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key]== "") {

            return res.send("Please, fill all fields!")
        }
    }

Chef.update(req.body, function(){


    return res.redirect(`/admin/chefs/${req.body.id}`)

})


},
delete(req, res) {

    Chef.delete(req.body.id, function(){


        return res.redirect("/admin/chefs")

    })



}





}  