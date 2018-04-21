import axios from 'axios'

const initialState = {
    user: {},
    loading: false
}

const UPDATE_USER = 'UPDATE_USER'

export function getUserData(){
    const userInfo = axios.get('/auth/me')
    .then( userData => {
        return userData.data
    })

    return {
        type: UPDATE_USER,
        payload: userInfo
    }
}

// address:"2945 S mystreet"
// auth_id:"google-oauth2|114146967500188859005"
// city:"Salt lake city"
// doe:"2012-12-12T07:00:00.000Z"
// email:"Travisallen6@gmail.com"
// emp_id:205301
// first_name:"Travis"
// gmail_user:"travisallen6"
// last_name:"Allen"
// mgr:false
// phone:"8016737357"
// position:"Ramp Manager"
// profile_pic:""
// state:"AZ"
// zip:"84128"


export function updateUserData(newUserData){
    return {
        type: UPDATE_USER,
        payload: newUserData
    }
}

export default function reducer(state=initialState, action) {

    switch(action.type){

        case UPDATE_USER + "_PENDING":
            return Object.assign( {}, state, {loading: true} )

        case UPDATE_USER + "_FULFILLED":
            return Object.assign( {}, state, {user: action.payload, loading: false} )

        default:
            return state
    }
    
}