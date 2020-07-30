const db = require("../../config/db")



module.exports = {


all(callback) {

    db.query(
        `
        SELECT *
        FROM chefs
        ORDER BY chefs.name ASC
        
        
        `, function(err, results) {

            if(err) throw `Database Error! ${err}`

            callback(results.rows)

        }



    )




},
create(data, callback) {

    const keys = Object.keys(data)

    for(key of keys) {
        if (data[key]== "") {

            return res.send("Please, fill all fields!")
        }
    }


    const query = `
    
    INSERT into chefs (

        name,
        avatar_url

    ) VALUES ($1, $2)
    RETURNING id
    
    
    `

    const values = [

        data.name,
        data.image


    ]

    db.query(query, values, function(err, results){

        if (err) throw `Database error! ${err}`

        callback(results.rows[0])


    })



},
showChef(id, callback) {
    db.query(` SELECT chefs.*, recipes.title as recipe_name, recipes.id as recipe_id
    FROM chefs
    LEFT JOIN recipes on (chefs.id = recipes.chef_id)
    where chefs.id = $1
  `, [id], function(err, results) {
        if (err) throw `
                Database Error!$ { err }
                `
        callback(results.rows)
    })
},
find(id, callback) {
    db.query(`SELECT chefs.*, count(recipes) as total_recipes
    FROM chefs
    LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
    WHERE chefs.id = $1
    group by chefs.id`, [id], function(err, results) { 
        if (err) throw `Database Error! ${err}`
        callback(results.rows[0])
    })
},
update(data, callback) {

    const query = `
        
        UPDATE chefs SET 
        name=($1),
        avatar_url=($2)
        WHERE id = $3
        `
        const values = [

            data.name,
            data.image,
            data.id

        ]

        db.query(query, values, function(err, results){

            if(err) throw `Database Error ${err}`


           return callback()

        })


},
delete(id, callback) {

    db.query(`DELETE FROM chefs WHERE id=$1`, [id], function(err, results){


        if(err) throw `Database Error ${err}`

        callback()


    })


}





}