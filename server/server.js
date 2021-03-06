require('dotenv').config();
const moment = require('moment');

console.log(moment().format());

const express = require('express'),
  session = require('express-session'),
  passport = require('passport'),
  Auth0Strategy = require('passport-auth0'),
  massive = require('massive'),
  bodyParser = require('body-parser'),
  ctrl = require('./controller'),
  mid = require('./middleware'),
  nodemailer = require('nodemailer'),
  cron = require('node-cron'),
  populateDatabase = require('../db/utils/popDB');
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
  GMAIL_PASS,
} = process.env;

const app = express();

app.use(express.static(`${__dirname}/../build`));

app.use(bodyParser.json());

massive(CONNECTION_STRING)
  .then(db => {
    app.set('db', db);
    cron.schedule('0 0 * * *', () => {
      populateDatabase(db);
    });
  })
  .then(() => console.log('db connected'))
  .catch(err => console.log(err));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());

app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: 'openid profile',
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      const db = app.get('db');
      db.find_user([profile.nickname]).then(userResult => {
        if (!userResult[0]) {
          // If the user hasn't been loaded into the database by a manager prior to logging in.

          return done(null, null);
        }
        const profPic = userResult[0].profile_pic === null ? profile.picture : userResult[0].profile_pic;
        db.add_gprofile([userResult[0].emp_id, profile.id, profPic]).then(createdUser => {
          return done(null, userResult[0].emp_id);
        });
      });
    }
  )
);

passport.serializeUser((empId, done) => {
  done(null, empId);
});
passport.deserializeUser((empId, done) => {
  app
    .get('db')
    .find_session_user([empId])
    .then(loggedInUser => {
      done(null, loggedInUser[0]);
    });
});
app.use(mid.sessionToReqUser);

app.get('/auth', passport.authenticate('auth0'));
app.get(
  '/auth/callback',
  passport.authenticate('auth0', {
    successRedirect: '/profilecheck',
    failureRedirect: '/#/notauthorized',
  })
);

app.get('/api/loginusers', ctrl.getLoginUsers);

app.get('/api/mocklogin/:authid', (req, res) => {
  const { authid } = req.params;
  req.app
    .get('db')
    .mock_login([authid])
    .then(user => {
      const foundUser = user[0];
      if (!foundUser) {
        res.redirect(process.env.FAILURE_REDIRECT);
      } else {
        req.session.user = user[0];
        if (foundUser.mgr) {
          res.redirect(process.env.MANAGER_REDIRECT);
        } else {
          res.redirect(process.env.EMPLOYEE_REDIRECT);
        }
      }
    });
});

app.get('/profilecheck', ctrl.profileCheck);

app.post('/api/sendemail/:empid', ctrl.sendEmail);

app.post('/api/sendsms/:empid', ctrl.sendSms);

app.post('/api/user', ctrl.addUser);

app.post('/api/employee/:empid/profile', ctrl.completeEmployeeProfile);

app.put('/api/employee/:empid/profile', ctrl.managerUpdateEmployeeProfile);

app.put('/api/employee/:empid/myprofile', ctrl.employeeUpdateOwnProfile);

app.post('/api/employee/:empid/terminate', ctrl.addTermData);

app.delete('/api/employee/:empid/terminate', ctrl.terminateEmployee);

app.get('/api/roster', ctrl.getRoster);

app.get('/api/employee/:empid/detail', ctrl.getEmployeeDetail);

app.get('/api/employee/:empid/pattern', ctrl.getEmployeePattern);

app.post('/api/employee/:empid/pattern', ctrl.setEmployeePattern);

app.post('/api/timeoff/:empid/request', ctrl.addTORequest);

app.get('/api/timeoff/:empid/request', ctrl.getMyRequests);

// /////////////////////////////////////////////////////////////
app.get('/api/review/timeoff', ctrl.getAllRequests);

app.patch('/api/review/timeoff/', ctrl.changeStatusOfRequest);

app.post('/api/employee/:empid/exception', ctrl.addEmployeeExceptions);

app.post('/api/employee/:empid/multipleexceptions', ctrl.addMultipleExceptions);

app.get('/api/employee/:empid/exception', ctrl.getEmployeeExceptions);

app.get('/auth/me', ctrl.authCheck);

app.get('/auth/logout', ctrl.authLogout)




app.listen(SERVER_PORT, () => console.log(`Hard to port ${SERVER_PORT}`))


