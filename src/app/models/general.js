const db = require("../../config/db")



module.exports = {


all(callback) {

    
    db.query(
        `
        SELECT recipes.*, chefs.name AS chefs_name
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        ORDER BY recipes.id ASC
        `, function(err, results) {
    
            if(err) throw `Database Error! ${err}`
    
            callback(results.rows)
    
        }) 
    
    

},
show(id, callback) {

db.query(

    `
    SELECT recipes.*, chefs.name AS chefs_name
    FROM recipes
    LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
    WHERE recipes.id = $1
    
    `, [id], function(err, results) {
        
        if (err) throw `Database Error! ${err}`
        
        
        callback(results.rows[0])
        
        
    }
    )


},
find(callback) {
    db.query(`SELECT chefs.*, count(recipes) as total_recipes
    FROM chefs
    LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
    GROUP BY chefs.id`, function(err, results) { 
        if (err) throw `Database Error! ${err}`
        callback(results.rows)
    })

}



}