require('dotenv').config()

const   express = require('express')
        , session = require('express-session')
        , passport = require('passport') 
        , Auth0Strategy = require('passport-auth0')
        , massive = require('massive');

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
.then( ()=>console.log(`db connected`) )
.catch( err => console.log(err) )

// app.use(express.static(__dirname + './../build'))

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())

app.use(passport.session())

passport.use( new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');
    db.find_user([profile.nickname])
    .then( userResult => {
        if(!userResult[0]){
            // If the user hasn't been loaded into the database by a manager prior to logging in.

            return done(null, null)
           
        } else {
            
            db.add_gprofile([
                userResult[0].emp_id,
                profile.id,
                profile.picture
            ]).then( createdUser => {
                let user = {id: userResult[0].empid, mgr: userResult[0].mgr }
                return done(null, user )
            })
        }
    })
}))

passport.serializeUser((user, done)=>{
    // Takes the information passed in and is placed on the session store
    // This is invoked only once when the user logs in. 
    done(null, user);
})
passport.deserializeUser((user, done)=>{
    // This runs for every endpoint hit below this middleware after the user is logged in.

    // We don't just want the id on req.user, we want all of the data from the database as well. We will query the db here.
    app.get('db').find_session_user([id]).then( loggedInUser => {
        done(null, loggedInUser[0]);
    })
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/success',
    failureRedirect: 'http://localhost:3000/#/failure'
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
    res.redirect('http://localhost:3000/');
})



app.listen(SERVER_PORT, () => console.log(`Hard to port ${SERVER_PORT}`))