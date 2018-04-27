import React, { Component } from 'react';
import axios from 'axios';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'
import { fetchBear} from './actions';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);


//import reducers from separate file
let store = createStoreWithMiddleware(reducers)


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
		store.dispatch(fetchBear());
	}
	
	render() {
		let bears = this.state.data;
		return (
			<div> {bears.map(bear => <div key={bear.id}>{bear.name}</div>)}</div>
			);
	}
}

export default App;
