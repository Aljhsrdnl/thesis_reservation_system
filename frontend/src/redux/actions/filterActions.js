import axios from 'axios';
import { STOP_LOADING } from './type';
import { SHOW_ERROR_MESSAGE } from './type';
import { GET_ITEMS } from './type';

export const getItemsByFilter = arg => async dispatch => {
	try {
		const response = await axios.post('/api/filter/search', arg);

		dispatch({
			type: GET_ITEMS,
			payload: response.data.items,
		});
	} catch (err) {
		console.log('getItemsByFilter api error: ', err);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorMessage,
		});
	}
};