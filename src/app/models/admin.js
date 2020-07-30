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
find(id, callback) {

    db.query(
    `
    SELECT *
    FROM recipes
    WHERE id = $1`, [id], function(err, results){

        if(err) throw `Database Error! ${err}`

        callback(results.rows[0])

    }


    ) 

},
update(data, callback) {

    const keys = Object.keys(data)

    for(key of keys) {
        if (data[key]== "") {

            return res.send("Please, fill all fields!")
        }
    }
 
    const query = `
    
    UPDATE recipes SET
        chef_id=($1),
        image=($2),
        title=($3),
        ingredients=($4),
        preparation=($5),
        information=($6)
        WHERE id = $7 
    `
 
    const values = [

        data.chef_id,
        data.image,
        data.title,
        data.ingredients,
        data.preparation,
        data.information,
        data.id
    ]

    db.query(query, values, function(err, results){


        if (err) throw `Database error! ${err}`

        callback()
    })


},
delete(id, callback) {


    db.query(`DELETE FROM recipes WHERE id=$1`, [id], function(err, results){

        if(err) throw `Database Error! ${err}`

        return callback()

    })
},
selectChefOptions(callback) {

db.query(`

select name, id from chefs


`, function(err, results){

if (err) throw `Database Error! ${err}`

callback(results.rows)



})



},
selectChefOption(callback) {

    db.query(`
    
    select name, id from chefs
    
    
    `, function(err, results){
    
    if (err) throw `Database Error! ${err}`
    
    callback(results.rows[0])
    
    
    
    })
    
    
    
    }


}