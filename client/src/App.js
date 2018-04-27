import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
	constructor()
	{
		super();
		this.state = {data: []};
	}

	updateMessage() {
		this.setState({message: "my friend (from changed state) !"});
	}

	getBear() {
		try {
			return axios.get('http://localhost:8000/api/bears')
		} catch (error){
			console.error(error);
		}
	}

	componentDidMount(){
		this.getBear().then(result => {
			this.setState({data: result.data})
		})
	}
	
  render() {
  	let bears = this.state.data;
    return (
      <div> {bears.map(bear => <div key={bear.id}>{bear.name}</div>)}</div>
    );
  }
}

export default App;
