const pg = require("pg");
const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
  }
});



const peopleDetails = [process.argv.slice(2)];
const [first_name, last_name, birthdate] = peopleDetails;



knex.insert([{ first_name: first_name, last_name: last_name, birthdate: birthdate }], '*').into('famous_people')
  .asCallback((err, res) => {
    err ? console.log(err) : console.log(res)
    knex.select('first_name').from('famous_people')
      .asCallback((err, res) => {
        if (err) {
          return console.error("error running query", err);
        }
        console.log(res);
      })    
});
