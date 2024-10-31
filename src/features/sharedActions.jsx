// src/features/sharedActions.js
export const FETCH_DATA_START = 'data/fetchDataStart';
export const FETCH_DATA_SUCCESS = 'data/fetchDataSuccess';
export const FETCH_DATA_FAILURE = 'data/fetchDataFailure';

export const fetchDataStart = (key) => ({
    type: `${FETCH_DATA_START}/${key}`,
});

export const fetchDataSuccess = (key, data) => ({
    type: `${FETCH_DATA_SUCCESS}/${key}`,
    payload: data,
});

export const fetchDataFailure = (key, error) => ({
    type: `${FETCH_DATA_FAILURE}/${key}`,
    payload: error,
});
