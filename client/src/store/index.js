import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../components/reducers/rootReducr'

const middleWare = applyMiddleware( window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const store = createStore(reducer, applyMiddleware(thunk)); 

export default store;