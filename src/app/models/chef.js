const db = require("../../config/db")



module.exports = {


all(callback) {

    return db.query(
        `
        SELECT *
        FROM chefs
        ORDER BY chefs.name ASC 
        
        
        `)




},
create(data, id) {

    const keys = Object.keys(data)

    for(key of keys) {
        if (data[key]== "") {

            return res.send("Please, fill all fields!")
        }
    }


    const query = `
    
    INSERT into chefs (

        name,
        file_id

    ) VALUES ($1, $2)
    RETURNING id
    
    
    `

    const values = [

        data.name,
        id


    ]

    return db.query(query, values)



},
showChef(id) {
    return db.query(` SELECT chefs.*, recipes.title as recipe_name, recipes.id as recipe_id
    FROM chefs
    LEFT JOIN recipes on (chefs.id = recipes.chef_id)
    where chefs.id = $1
  `, [id])
},
find(id) {
    return db.query(`SELECT chefs.*, count(recipes) as total_recipes
    FROM chefs
    LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
    WHERE chefs.id = $1
    group by chefs.id`, [id])
},
updateImage(data, id) {

    const query = `
        
        UPDATE chefs SET 
        name=($1), 
        file_id=($2)
        WHERE id = $3
        `
        const values = [

            data.name,
            id,
            data.id

        ]

        return db.query(query, values)


},
update(data) {

    const query = `
        
        UPDATE chefs SET 
        name=($1) 
        WHERE id = $2
        `
        const values = [

            data.name,
            data.id

        ]

        return db.query(query, values)


},
delete(id) {

   return db.query(`DELETE FROM chefs WHERE id=$1`, [id])


}





}