const db = require("../../config/db")



module.exports = {

all() {

   return db.query(
    `
    SELECT recipes.*, chefs.name AS chefs_name
    FROM recipes
    LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
    ORDER BY recipes.id ASC
    `) 

},
create(data) {

    
    const query = `
    
    INSERT into recipes (

        chef_id,
        title,
        ingredients,
        preparation,
        information
    ) VALUES ($1, $2, $3, $4, $5)
    RETURNING id
    
    `

    const values = [
        data.chef_id,
        data.title,
        data.ingredients,
        data.preparation,
        data.information
    
    ]

    return db.query(query, values)



},
find(id) {

    return db.query(
    `
    SELECT *
    FROM recipes
    WHERE id = $1`, [id])

},

update(data, callback) {

 
    const query = `
    
    UPDATE recipes SET
        chef_id=($1),
        title=($2),
        ingredients=($3),
        preparation=($4),
        information=($5)
        WHERE id = $6
    `
 
    const values = [

        data.chef_id,
        data.title,
        data.ingredients,
        data.preparation,
        data.information,
        data.id
    ]

    return db.query(query, values)
    


},
delete(id, callback) {


    return db.query(`DELETE FROM recipes WHERE id=$1`, [id])
},
selectChefOptions() {

return db.query(`

select name, id 
from chefs


`)



},
selectChefOption(id) {

    return db.query(`
    
    select name from chefs where id = $1
    
    
    `, [id])
    
    
    
    },
    getAllRecipes(id) {
        return db.query(`
        SELECT recipes.id
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE chefs.id = $1
        ORDER BY recipes.id ASC`, [id])
    }


}