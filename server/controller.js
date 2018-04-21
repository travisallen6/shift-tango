require('dotenv').config()
const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
})

module.exports = {

    addUser: (req, res) => {
        let { 
            firstNameInput, lastNameInput, positionInput, managerInput, empIdInput, googleInput, doeInput
        } = req.body

        req.app.get('db')
        .add_user([empIdInput, managerInput, lastNameInput, firstNameInput, googleInput, positionInput, doeInput])
        .then( newUser => res.send(newUser))
    },

    sendEmail: (req, res) => {

        var mailOptions = {
            from: 'shifttango@gmail.com',
            // to: req.body.to,
            subject: req.body.subject,
            html: req.body.html
        }
        req.app.get('db').get_email([req.params.empid])
        .then( emailAddress => {
            mailOptions.to = emailAddress[0].email 
            transporter.sendMail(mailOptions, function(err, info){
                if(err) console.log(err)
                else console.log(info)
            })
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    },

    completeEmployeeProfile: (req, res)=>{

        let { profile_pic, phone, address, city, state, email, zip } = req.body
    
        let { empid } = req.params
    
        req.app.get('db').update_user_profile([empid, profile_pic, phone, address, city, state, email, zip])
        .then( res.sendStatus(200) )
    
        
    },

    managerUpdateEmployeeProfile: (req, res)=>{
        let {
            firstNameInput, lastNameInput, picUrlInput, positionInput, managerInput, empIdInput, doeInput, phoneInput, addressInput, cityInput, stateInput, zipInput, emailInput 
        } = req.body.profileData

        let {empid} = req.params

        req.app.get('db').manager_update_employee_profile([empid, firstNameInput, lastNameInput, picUrlInput, positionInput, managerInput, empIdInput, doeInput, phoneInput,addressInput, cityInput, stateInput, zipInput, emailInput ])
        .then( updatedProfile => res.send(updatedProfile))
        .catch( err => console.log(err))

    },
   
    terminateEmployee: (req, res) => {
        let{ empid } = req.params
        let { reason, termination_date } = req.body
        req.app.get('db').terminate_employee([empid, reason, termination_date])
        .then( terminatedEmp =>{
            res.sendStatus(200)
        })
    },

    authCheck: (req, res) => {
        if(req.user) {
            res.status(200).send(req.user)
        } else {
            res.status(401).send('Nice try suckaaaaaa')
        }
    },
    
    authLogout: (req, res) => {
        req.logOut();
        res.redirect(process.env.LOGOUT_REDIRECT);
    },

    profileCheck: (req, res, next) => {
        let { phone, address, city, state, email, zip } = req.user
        if(phone === null || address === null || city === null || state === null || email === null || zip === null ){
            return res.redirect(process.env.FINISH_PROFILE)
        } else if(req.user.mgr){
            return res.redirect(process.env.MANAGER_REDIRECT)
        } else {
            return res.redirect(process.env.EMPLOYEE_REDIRECT)
        }
    },

    getRoster: (req, res) =>{
        req.app.get('db').get_roster_active()
        .then( activeRoster => {
            req.app.get('db').get_roster_terminated()
            .then(terminatedRoster => {
                
                let combinedRoster = {
                    active: activeRoster,
                    terminated: terminatedRoster
                }

                res.send(combinedRoster)
            })
        })
        .catch(err=>console.log(err))
    },

    getEmployeeDetail: (req, res) => {
        req.app.get('db').get_employee_detail([req.params.empid])
        .then( employee =>{
            req.app.get('db').get_employee_exceptions([req.params.empid])
            .then( exceptions =>{
                let employeeProfileExceptions = {}

                employeeProfileExceptions.profile = employee[0]
                employeeProfileExceptions.exceptions = exceptions
                res.send(employeeProfileExceptions)
            })
            .catch(err => console.log(err)) 
        })
        .catch(err => console.log(err))
    },

    getEmployeePattern: (req, res) => {
        req.app.get('db').get_employee_pattern([req.params.empid])
        .then( pattern => res.send(pattern))
    },

    setEmployeePattern: (req, res) => {
        let { pattern: [sun, mon, tue, wed, thu, fri, sat] } = req.body
        let { empid } = req.params

        req.app.get('db').set_employee_pattern([empid, sun, mon, tue, wed, thu, fri, sat])
        .then( response => res.sendStatus(200) )
    },

    addEmployeeExceptions: (req, res) => {
        let { exceptions } = req.body
        let {empid} = req.params

        exceptions.forEach( exception =>{
            let { date, type, shift } = exception
            req.app.get('db').add_exception( [empid, date, type, shift, null] )
            
        })
        res.sendStatus(200)

    },

    addTORequest: (req, res) => {
        let { empid } = req.params
        let { 
            startDate, endDate, requestType, requestReason
        } = req.body
        
        req.app.get('db').add_timeoff_request([empid, startDate, endDate, 'Pending', requestReason, requestType])
        .then( res.sendStatus(200) )
        .catch( err => console.log(err) )

    },

    getMyRequests: (req, res) => {
        let { empid } = req.params
        req.app.get('db').get_timeoff_requests([empid])
        .then( myRequests => {
            res.send(myRequests)
        })
        .catch(err => console.log(err))
    },

    getAllRequests: (req, res) => {

        req.app.get('db').get_all_timeoff_requests([])
        .then( timeoffRequests => {
            req.app.get('db').append_employee_exceptions([])
            .then( exceptions => {
                    res.send( {timeoffRequests, exceptions} )
            })
            .catch(err => console.log(err))
        }) 
        .catch(err => console.log(err))
       
    },

    changeStatusOfRequest: (req, res) => {
        let { id, newStatus, reason } = req.body
        req.app.get('db').update_status_timeoff_request([id, newStatus, reason])
        .then( timeoffRequests => {
            req.app.get('db').append_employee_exceptions([])
            .then( exceptions => {
                    res.send( {timeoffRequests, exceptions} )
            })
            .catch(err => console.log(err))
        })
        .catch( err => console.log( err ))
    },

    getEmployeeExceptions: (req, res) => {
        let {empid} = req.params
        req.app.get('db').get_employee_exceptions([empid]).then( empExceptions =>{
            res.send(empExceptions)
        })
        .catch( err => console.log(err))
    },

   addMultipleExceptions: (req, res) => {
       let { exceptions, timeoffId } = req.body
       let { empid } = req.params

       exceptions.forEach( exception => {
           req.app.get('db')
           .add_exception([empid, exception.date, exception.type, exception.shift, timeoffId])
           .catch(err => console.log(err))
       })

       res.sendStatus(200)
   }

}






