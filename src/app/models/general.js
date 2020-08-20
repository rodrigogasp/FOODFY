const db = require("../../config/db")



module.exports = {


all(callback) {

    
    db.query(
        `
        SELECT recipes.*, chefs.name AS chefs_name
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        ORDER BY recipes.created_at DESC
        `, function(err, results) {
    
            if(err) throw `Database Error! ${err}`
    
            callback(results.rows)
    
        }) 
    
    

},
show(id) {

return db.query(

    `
    SELECT recipes.*, chefs.name AS chefs_name
    FROM recipes
    LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
    WHERE recipes.id = $1
    
    `, [id])
        
        

},
find() {
   return db.query(`SELECT chefs.*, count(recipes) as total_recipes
    FROM chefs
    LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
    GROUP BY chefs.id`)

},
paginateHome(params) {
    const { filter, limit, offset} = params

    let query = "",
        filterQuery = "",
        totalQuery = `(
                SELECT count(*) FROM recipes
                ) AS total`

    if (filter) {

        filterQuery = `
            WHERE recipes.title ILIKE '%${filter}%'
        `
        totalQuery = `(
            SELECT count (*) FROM recipes
            ${filterQuery}
            )as total
        `
    }

    query = `
        SELECT recipes.*,${totalQuery}, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        ${filterQuery}
        ORDER BY recipes.created_at DESC
        LIMIT $1 OFFSET $2
    `

    return db.query(query, [limit, offset])
},
paginateRecipes(params) {
    const { filter, limit, offset} = params

    let query = "",
        filterQuery = "",
        totalQuery = `(
                SELECT count(*) FROM recipes
                ) AS total`

    if (filter) {

        filterQuery = `
            WHERE recipes.title ILIKE '%${filter}%'
        `
        totalQuery = `(
            SELECT count (*) FROM recipes
            ${filterQuery}
            )as total
        `
    }

    query = `
        SELECT recipes.*,${totalQuery}, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        ${filterQuery}
        ORDER BY recipes.updated_at DESC
        LIMIT $1 OFFSET $2
    `

    return db.query(query, [limit, offset])
}



}