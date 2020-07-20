
const Chef = require("../models/chef")
const chef = require("../models/chef")


module.exports = {


index(req, res) {

Chef.all(function(items){


    return res.render("admin/chefs/index", {items})


})




},
create(req, res) {


return res.render("admin/chefs/create")


},
post(req, res){

Chef.create(req.body, function(items){

    return res.redirect(`/admin/chefs`)


})



},
show(req, res){

Chef.find(req.params.id, function(item){

if(!item) return res.send("Chef not found")

return res.render(`admin/chefs/show`, {item})


})



}





}  