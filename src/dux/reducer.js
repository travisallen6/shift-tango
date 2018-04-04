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