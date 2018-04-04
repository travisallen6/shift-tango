import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import promiseMiddleware from 'redux-promise-middleware'

const middleWare = applyMiddleware( promiseMiddleware() )

export default createStore(reducer, middleWare);