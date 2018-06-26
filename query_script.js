const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  const values = [process.argv[2]]
  client.query("SELECT * FROM famous_people WHERE first_name = $1", values, (err, result) => {  //$(num) corresponds with index of array
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows); 
    client.end();
  });
});


