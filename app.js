const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path : './.env' });

const app = express();

const db = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './public');

app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended:  false }));
app.use(express.json());

app.set('view engine', 'hbs');
 

db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL Connected...!!")
    }
})

app.use('/', require('./Routes/pages'));
app.use('/auth', require('./Routes/auth'));



app.listen(5001, () => {
    console.log("Server is running at 5001");
})
