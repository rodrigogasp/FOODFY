const db = require("../../config/db")


module.exports = {


create(id, recipeId) {

const query = `

    INSERT INTO recipe_files (

        recipe_id,
        file_id

    ) VALUES ($1, $2) RETURNING id

`

const values = [

    id,
    recipeId


]

return db.query(query, values) 


},
all() {


return db.query(`
select * from files
left join recipe_files ON (recipe_files.file_id = files.id)
ORDER BY file_id ASC
`)

},
delete(id) {

    return db.query (`
        DELETE FROM recipe_files WHERE file_id = $1`, [id])
   


},
deleteAll(id) {

    return db.query (`
        DELETE FROM recipe_files WHERE recipe_id = $1`, [id])
   


},




}