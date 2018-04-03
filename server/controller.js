require('dotenv').config()

const       express = require('express')
            , bodyParser = require('body-parser')
            , massive  = require('passport')
            , session = require('express-session')
            , passport = require('passport')
            , Auth0Strategy = require('passport-auth0')

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env

const app = express();

massive(CONNECTION_STRING).then( db => {
    app.set('db', db);
})

app.use(express.static(__dirname + './../build'))

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
    // Starts up passport
app.use(passport.session())
    // Allows passport to interact with sessions. Place on req.user
passport.use( new Auth0Strategy({
    // Turn off OIDC conformant in advanced auth0 > settings > oath 
    // Copy the information out of client > clientName > settings
    //  domain, client_id, client_secret
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    // If the user is logged in, this callback function will execute
    // db calls go here 
    const db = app.get('db');
    // Ask the database if we already have this user in our database
    db.find_user([profile.id])
    .then( userResult => {
        if(!userResult[0]){
            // If no user is found, userResult[0] will return undefined = falsey

            db.create_user([
                profile.displayName,
                profile.id,
                profile.picture
            ]).then( createdUser => {
                // Passing only the id to be put on the session store since we don't want to put all of the other information on the session store. The rest of the information will be accessed from the database.
                return done(null, createdUser[0].id)
            })
        } else {
            return done(null, userResult[0].id)
        }
    })
}))

passport.serializeUser((id, done)=>{
    // Takes the information passed in and is placed on the session store
    // This is invoked only once when the user logs in. 
    done(null, id);
})
passport.deserializeUser((id, done)=>{
    // This runs for every endpoint hit below this middleware after the user is logged in.

    // We don't just want the id on req.user, we want all of the data from the database as well. We will query the db here.
    app.get('db').find_session_user([id]).then( loggedInUser => {
        done(null, loggedInUser[0]);
    })
})

app.get('/auth', passport.authenticate('auth0'))
    // This endpoint kicks off the process. Checks if the user is logged in (shouldn't be), if not, prompts the user to log in.
app.get('/auth/callback', passport.authenticate('auth0', {
    // Auth0 will route the user to the callback route after logging them in
    // This endpoint will check to see if the user is logged in, if yes, it will redirect them using the configuration properties below: 
    successRedirect: 'http://localhost:3002/#/private',
    failureRedirect: 'http://localhost:3002'
}))
app.get('/auth/me', function(req, res) {
    if(req.user) {
        res.status(200).send(req.user)
    } else {
        res.status(401).send('Nice try suckaaaaaa')
    }
})
app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3002/');
})



app.listen(SERVER_PORT, () => console.log(`Hard to port ${SERVER_PORT}`))