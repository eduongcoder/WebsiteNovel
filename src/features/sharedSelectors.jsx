// src/features/sharedSelectors.js
export const selectDataItemsByKey = (state, key) => state.data.dataByKey[key] || [];
export const selectDataStatusByKey = (state, key) => state.data.statusByKey[key] || 'idle';
export const selectDataErrorByKey = (state, key) => state.data.errorByKey[key];
