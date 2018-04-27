import React, { Component } from 'react';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const getBear = () => {
	try {
		return axios.get('http://localhost:8000/api/bears')
	} catch (error){
		console.error(error);
	}
}

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
//reducer specify how state changed in respond to action
//Ex a pure function that take the previous state and an action then give the next state
//action are payload of information send from app to store, is store only 
//source of information, send using dispatch(store.dispatch() or use libraly)
let reducer = function(state = [], action){
	if(action){
		if(action.type == 'FETCH_BEAR'){
			//action type specify how to react
			return action.payload
		}
	}
	return state
}
let store = createStoreWithMiddleware(reducer)

//action creator is function that create action, can see from dispatch
//in the function which is what use to send action to store
let fetchBearActionCreator = function(){
	return (dispatch) => {
		getBear()
		.then(result => {
			dispatch({type: 'FETCH_BEAR', payload: result.data})
		})
	}
}
class App extends Component {
	constructor()
	{
		super();
		this.state = {data: []};
	}

	updateMessage() {
		this.setState({message: "my friend (from changed state) !"});
	}


	componentDidMount(){
		store.subscribe(() => {
			this.setState({data: store.getState()})
		})
		store.dispatch(fetchBearActionCreator());
	}
	
	render() {
		let bears = this.state.data;
		return (
			<div> {bears.map(bear => <div key={bear.id}>{bear.name}</div>)}</div>
			);
	}
}

export default App;
