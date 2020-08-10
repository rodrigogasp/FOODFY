

const Admin = require("../models/admin")
const File = require("../models/file")
const RecipeFile = require("../models/recipeFile")
const { selectChefOptions } = require("../models/admin")
const file = require("../models/file")


module.exports = {

    async index(req, res) {


        let results = await Admin.all()
        const items = results.rows

        results = await RecipeFile.all()
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render("admin/recipes/index", { items, files })

    },
    async show(req, res) {

        let results = await Admin.find(req.params.id)

        if (!results) return res.send("Recipe not found!")

        const items = results.rows[0]
        const chefid = results.rows[0].chef_id
        const recipeID = results.rows[0].id


        results = await Admin.selectChefOption(chefid)

        const options = results.rows[0]

        results = await RecipeFile.showSinglefile(recipeID)

        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render(`admin/recipes/show`, { items, options, files })


    },
    async create(req, res) {

        let results = await Admin.selectChefOptions()
        const items = results.rows



        return res.render("admin/recipes/create", { items })






    },
    async edit(req, res) {

        let results = await Admin.find(req.params.id)
        const items = results.rows[0]
        const recipeId = results.rows[0].id

        if (!items) return res.send("Recipe not found!")

        results = await Admin.selectChefOptions()

        const options = results.rows

        results = await File.getFiles(recipeId)


        let files = results.rows
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))


        return res.render("admin/recipes/edit", { items, options, files })

    },

    async post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        if (req.files.length == 0)
            return res.send('Please, send at least one image')


        let results = await Admin.create(req.body)
        const recipeID = results.rows[0].id


        const filespromise = req.files.map(file => File.create({ ...file }))


        const resultsFile = await (await Promise.all(filespromise)).map(file => file.rows[0].id)


        resultsFile.map(id => RecipeFile.create(recipeID, id))

        return res.redirect("/admin/recipes")



    },

    async put(req, res) {

        const keys = Object.keys(req.body)


        for (key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.send('Please, fill all fields!')
            }
        }


        let results = await Admin.find(req.body.id)
        const recipeID = results.rows[0].id



        if (req.files.length != 0) {
            const newFilesPromise = req.files.map(file =>
                File.create({ ...file }))

            const resultsFile = await (await Promise.all(newFilesPromise)).map(file => file.rows[0].id)

            resultsFile.map(id => RecipeFile.create(recipeID, id))
        }

        if (req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(",") // [1,2,3,] 
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1) // [1,2,3]

            const removedFilePromise = removedFiles.map(id => RecipeFile.delete(id))

            await Promise.all(removedFilePromise)

            const removedFilesPromise = removedFiles.map(id => File.delete(id))

            await Promise.all(removedFilesPromise)
        }


        await Admin.update(req.body)

        return res.redirect(`/admin/recipes`)
    },

    async delete(req, res) {


        const results = await File.getFiles(req.body.id)
        await RecipeFile.deleteAll(req.body.id)

        await Admin.delete(req.body.id)


        function getFilesId(results) {
            let fileid = []

            for (result of results) {

                id = result.id
                fileid.push(id)

            }

            return fileid

        }

        const fileid = getFilesId(results.rows)


        const deletefiles = fileid.map(fileid => File.delete(fileid))

        await Promise.all(deletefiles)



        return res.redirect("/admin/recipes")


    }

}