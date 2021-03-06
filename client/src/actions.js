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

export function deleteBear(id) {
    return (dispatch) => {
        axios.delete(`http://localhost:8000/api/bears/${id}`)
        .then(() => {
            dispatch(fetchBear())
        })
    }
} 

export function createBear(bear) {
    return (dispatch) => {
        axios.post(`http://localhost:8000/api/bears`, bear)
        .then(() => {
            dispatch(fetchBear())
        })
    }
}
