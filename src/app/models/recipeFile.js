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


}





}