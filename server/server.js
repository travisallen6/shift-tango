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

app.use(bodyParser.json())

massive(CONNECTION_STRING).then( db => {
    app.set('db', db);
    // app.get('db').init.seed()
    // .then( res => console.log(res) )
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

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
    }
})

const mailOptions = {
    from: 'travis@allen.com',
    to: 'travisallen6@gmail.com',
    subject: 'Hello World',
    html: '<h1>Hello World</h1>'
}

app.get('/api/sendmail', function(req, res){
    transporter.sendMail(mailOptions, function(err, info){
        if(err) console.log(err)
        else console.log(info)
    })
    res.sendStatus(200)
    
})

app.get('/profilecheck', ctrl.profileCheck)

app.post('/api/user', ctrl.addUser)

app.post('/api/employee/:empid/profile', ctrl.completeEmployeeProfile)

app.put('/api/employee/:empid/profile', ctrl.managerUpdateEmployeeProfile)

app.post('/api/employee/:empid/terminate', ctrl.terminateEmployee)

app.get('/api/roster', ctrl.getRoster)

app.get('/api/employee/:empid/detail', ctrl.getEmployeeDetail)

app.get('/api/employee/:empid/pattern', ctrl.getEmployeePattern)

app.post('/api/employee/:empid/pattern', ctrl.setEmployeePattern)

app.post('/api/timeoff/:empid/request', ctrl.addTORequest)

app.get('/api/timeoff/:empid/request', ctrl.getMyRequests)

///////////////////////////////////////////////////////////////
app.get('/api/review/timeoff', ctrl.getAllRequests)

app.post('/api/employee/:empid/exception', ctrl.addEmployeeExceptions)

app.get('/api/employee/:empid/exception', ctrl.getEmployeeExceptions)

app.get('/auth/me', ctrl.authCheck)

app.get('/auth/logout', ctrl.authLogout)





app.listen(SERVER_PORT, () => console.log(`Hard to port ${SERVER_PORT}`))





// {
//     "timeoff_id": 1,
//     "start_date": "2018-04-17T06:00:00.000Z",
//     "end_date": "2018-04-18T06:00:00.000Z",
//     "status": "Pending",
//     "reason": "Because computer",
//     "request_type": null,
// }

// "emp_id": 205301,
// "last_name": "Nauahi",
// "first_name": "John",
// "position": "865432"
// "profile_pic": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg\t",