module.exports = {

    completeEmployeeProfile: (req, res, next)=>{

        let { profile_pic, phone, address, city, state, email, zip } = req.body
    
        let { empid } = req.params
    
        req.app.get('db').update_user_profile([empid, profile_pic, phone, address, city, state, email, zip])
    
        res.sendStatus(200)
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
        res.redirect('http://localhost:3000/');
    },

    profileCheck: (req, res, next) => {
        let { phone, address, city, state, email, zip } = req.user
        if(phone === null || address === null || city === null || state === null || email === null || zip === null ){
            return res.redirect('http://localhost:3000/#/finishprofile')
        } else if(req.user.mgr){
            return res.redirect('http://localhost:3000/#/managerdash')
        } else {
            return res.redirect('http://localhost:3000/#/employeedash')
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
            req.app.get('db').add_exception( [empid, date, type, shift] )
            
        })
        res.sendStatus(200)

    },

    getEmployeeExceptions: (req, res) => {
        let {empid} = req.params
        req.app.get('db').get_employee_exceptions([empid]).then( empExceptions =>{
            res.send(empExceptions)
        })
        .catch( err => console.log(err))
    }

}




