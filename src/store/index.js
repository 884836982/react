import reducer from './reducers/reducer';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import reduxPromise from 'redux-promise-middleware';
let reducers = combineReducers({
    reducer
})
const store = createStore(reducers,applyMiddleware(reduxPromise())) 
export default store;