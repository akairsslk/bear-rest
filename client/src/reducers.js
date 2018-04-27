import { createStore, applyMiddleware, combineReducers } from 'redux';
//just brings reducers to separate files

//reducer specify how state changed in respond to action
//Ex a pure function that take the previous state and an action then give the next state
//action are payload of information send from app to store, is store only 
//source of information, send using dispatch(store.dispatch() or use libraly)
let bearReducer = function(state = [], action){
	if(action){
		if(action.type == 'FETCH_BEAR'){
			//action type specify how to react
			return action.payload
		}
	}
	return state
}

let reducers = combineReducers({
	bear: bearReducer
})

export default reducers;