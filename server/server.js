require('dotenv').config()

const   express = require('express')
        , session = require('express-session')
        , passport = require('passport') 
        , Auth0Strategy = require('passport-auth0')
        , massive = require('massive')
        , bodyParser = require('body-parser')
        , ctrl = require('./controller')
        // , cors = require('cors')

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

app.use(bodyParser.json())

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
            let profPic = userResult[0].profile_pic === null ? 
                profile.picture : userResult[0].profile_pic
            db.add_gprofile([
                userResult[0].emp_id,
                profile.id,
                profPic
            ]).then( createdUser => {
                return done(null, userResult[0].emp_id )
            })
        }
    })
}))

passport.serializeUser((empId, done)=>{
    done(null, empId);
})
passport.deserializeUser( (empId, done) => {
    app.get('db').find_session_user([empId]).then( loggedInUser => {
        done(null, loggedInUser[0]);
    })
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: '/profilecheck',
    failureRedirect: '/failure'
}))

app.get('/profilecheck', ctrl.profileCheck)

app.post('/api/employee/:empid/profile', ctrl.getEmployeeProfile)

app.get('/api/roster', ctrl.getRoster)

app.get('/auth/me', ctrl.authCheck)

app.get('/auth/logout', ctrl.authLogout)



app.listen(SERVER_PORT, () => console.log(`Hard to port ${SERVER_PORT}`))