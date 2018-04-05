module.exports = {

    getEmployeeProfile: (req, res, next)=>{

        let { profile_pic, phone, address, city, state, email, zip } = req.body
    
        let { empid } = req.params
    
        req.app.get('db').update_user_profile([empid, profile_pic, phone, address, city, state, email, zip])
    
        res.sendStatus(200)
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
            return res.redirect('/#/managerdash')
        } else {
            return res.redirect('/#/employeedash')
        }
    },

    getRoster: (req, res) =>{
        req.app.get('db').get_roster()
        .then( roster => res.send(roster) )
    }

}