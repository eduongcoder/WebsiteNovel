// src/features/sharedReducer.js
import {
    FETCH_DATA_START,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
  } from './sharedActions';
  
  const initialState = {
    dataByKey: {}, // Stores data for different keys
    statusByKey: {},
    errorByKey: {},
  };
  
  const sharedReducer = (state = initialState, action) => {
    const matches = /(.*)\/(.*)/.exec(action.type);
    if (!matches) return state;
  
    const [, actionType, key] = matches;
    switch (actionType) {
      case FETCH_DATA_START:
        return {
          ...state,
          statusByKey: {
            ...state.statusByKey,
            [key]: 'loading',
          },
        };
      case FETCH_DATA_SUCCESS:
        return {
          ...state,
          dataByKey: {
            ...state.dataByKey,
            [key]: action.payload,
          },
          statusByKey: {
            ...state.statusByKey,
            [key]: 'succeeded',
          },
        };
      case FETCH_DATA_FAILURE:
        return {
          ...state,
          statusByKey: {
            ...state.statusByKey,
            [key]: 'failed',
          },
          errorByKey: {
            ...state.errorByKey,
            [key]: action.payload,
          },
        };
      default:
        return state;
    }
  };
  
  export default sharedReducer;
  