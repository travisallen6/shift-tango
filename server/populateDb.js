require('dotenv').config()

const   express = require('express')
        , session = require('express-session')
        , passport = require('passport') 
        , Auth0Strategy = require('passport-auth0')
        , massive = require('massive')
        , bodyParser = require('body-parser')
        , ctrl = require('./controller')
        , nodemailer = require('nodemailer')
        // , cors = require('cors')

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
    GMAIL_USER,
    GMAIL_PASS
} = process.env

const app = express();

app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json())

async function populateDb(mult){
    try {
        let db = await massive(CONNECTION_STRING)
        await app.set('db', db)
        console.log('db connected')
        (emp_id, mgr, last_name, first_name, auth_id, profile_pic, gmail_user, phone, position, doe, address, city, state, zip, email)
    } catch (err) {
        console.log(err)
    }
}
   
