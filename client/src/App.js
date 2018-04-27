import React, { Component } from 'react';
import axios from 'axios';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'

const getBear = () => {
	try {
		return axios.get('http://localhost:8000/api/bears')
	} catch (error){
		console.error(error);
	}
}

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);


//import reducers from separate file
let store = createStoreWithMiddleware(reducers)

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
			//need to give keys so the combineReducer can select the correct reducer
			this.setState({data: store.getState().bear})
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
