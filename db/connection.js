const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';



const config = 
ENV === "production"
?{ 
  connectionString: process.env.DATABASE_URL,
  max: 2,
}
: {};


// require('dotenv').config({
//   path: `${__dirname}/../.env.${ENV}`,
// });


if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
 
  throw new Error('PGDATABASE or DATABASE_URL not set');
}

// console.log(process.env.DATABASE_URL)
// console.log(process.env.PGDATABASE)

module.exports = new Pool(config);
