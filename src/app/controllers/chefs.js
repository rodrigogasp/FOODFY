
const Chef = require("../models/chef")
const File = require("../models/file")
const Admin = require("../models/admin")
const RecipeFile = require("../models/recipeFile")


const { getChefFile } = require("../models/file")
const { getRecipeFile } = require("../models/recipeFile")



module.exports = {


async index(req, res) {

let results = await Chef.all()
const items = results.rows

results = await File.getAllfiles()
const allfiles = results.rows

const files = results.rows.map(file => ({
    ...file,
    src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
}))

return res.render("admin/chefs/index", {items, files})



},
create(req, res) {

    

return res.render("admin/chefs/create")


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


let results = await File.create(...req.files)
const Fileid = results.rows[0].id


results = await Chef.create(req.body, Fileid)



return res.redirect(`/admin/chefs`)




},
async show(req, res){

  let results = await Chef.showChef(req.params.id)
  const items = results.rows[0]
  const recipes = results.rows
if(!items) return res.send("Chef not found!")


    results = await Chef.find(req.params.id)
    const chef = results.rows[0]


results = await Admin.getAllRecipes(req.params.id) 

function getFilesId(results) {
    let recipeid = []

 for(result of results) {

    id = result.id
    recipeid.push(id)

}

return recipeid

}

const recipeid = getFilesId(results.rows)

const getrecipeFile = recipeid.map(id => getRecipeFile(id))

const recipeFile = await (await (await Promise.all(getrecipeFile)).map(file => file.rows[0]))

const Filerecipe = recipeid.map(id => File.getFiles(id))

const resultsFile = await (await Promise.all(Filerecipe)).map(file => file.rows[0].id)

const getfiles = resultsFile.map(id => File.getFileById(id))
const file = await(await Promise.all(getfiles)).map(file => file.rows[0])

const files = file.map(file => ({
    ...file,
    src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
}))

results = await File.getChefFile(req.params.id)
const chefFile = results.rows.map(file => ({
    ...file,
    src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
}))

return res.render("admin/chefs/show", {items, chef, recipes, files, recipeFile, chefFile})


},
async edit(req, res) {

    let results = await Chef.showChef(req.params.id)
    const items = results.rows[0]

    if(!items) return res.send("Chef not found!")
    
    results = await Chef.find(req.params.id)

    const chef = results.rows[0]
    const chefId = results.rows[0].id

    results = await File.getChefFile(chefId)
    let files = results.rows
    files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))
    

return res.render("admin/chefs/edit", {items, chef, files, chefId}) 
  

},
async put(req, res) {

    const keys = Object.keys(req.body)

    for(key of keys) {
    if (req.body[key] == "" && key != "removed_files") {
    return res.send('Please, fill all fields!')
    }
    }


    if(req.files.length == 0 && req.body.removed_files) {
        return res.send('Please send at least one image')
    }

     
      if (req.files.length != 0) {
        let results = await File.create(...req.files)
        const Fileid = results.rows[0].id
        await Chef.updateImage(req.body, Fileid)  
    }

        if(req.files.length == 0) {

            await Chef.update(req.body)

        }


    

        if (req.body.removed_files) { 
            const removedFiles = req.body.removed_files.split(",") // [1,2,3,] 
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1) // [1,2,3]
            
            const removedFilesPromise = removedFiles.map(id => File.delete(id))  
            
            await Promise.all(removedFilesPromise)
            }


    return res.redirect(`/admin/chefs/${req.body.id}`)




},

async delete(req, res) {

    let results = await getChefFile(req.body.id)
    
    await Chef.delete(req.body.id)
    
    const fileId = results.rows[0].id

    
    
    await File.delete(fileId)



    return res.redirect("/admin/chefs")




}  

}
