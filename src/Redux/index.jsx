import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './ReduxSlice/categorySlice';
import authorReducer from './ReduxSlice/authorSlice';
import novelReducer from './ReduxSlice/novelSlice';
import povReducer from './ReduxSlice/povSlice';
import chapterReducer from './ReduxSlice/chapterSlice';


const store = configureStore({
  reducer: {
    category: categoryReducer,
    author: authorReducer,
    novel: novelReducer,
    pov: povReducer,
    chapter: chapterReducer,
  },
});

export default store;
