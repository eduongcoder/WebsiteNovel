// src/features/sharedThunks.js
import axios from 'axios';
import {
    fetchDataStart,
    fetchDataSuccess,
    fetchDataFailure,
} from './sharedActions';

export const fetchData = (key, endpoint) => async (dispatch) => {
    dispatch(fetchDataStart(key));
    try {
        const response = await axios.get(endpoint);
        dispatch(fetchDataSuccess(key, response.data));
    } catch (error) {
        dispatch(fetchDataFailure(key, error.message));
    }
};
