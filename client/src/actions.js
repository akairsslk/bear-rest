import axios from 'axios';

const getBear = () => {
	try {
		return axios.get('http://localhost:8000/api/bears')
	} catch (error){
		console.error(error);
	}
}

//action creator is function that create action, can see from dispatch
//in the function which is what use to send action to store
export function fetchBear() {
	return (dispatch) => {
		getBear()
		.then(result => {
			dispatch({type: 'FETCH_BEAR', payload: result.data})
		})
	}
}
