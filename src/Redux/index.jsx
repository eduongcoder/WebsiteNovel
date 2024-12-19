import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './ReduxSlice/categorySlice';
import authorReducer from './ReduxSlice/authorSlice';
import novelReducer from './ReduxSlice/novelSlice';
import povReducer from './ReduxSlice/povSlice';
import chapterReducer from './ReduxSlice/chapterSlice';
import userReducer from './ReduxSlice/userSlice';
import CommentReducer from './ReduxSlice/commentSlice';
const store = configureStore({
  reducer: {
    category: categoryReducer,
    author: authorReducer,
    novel: novelReducer,
    pov: povReducer,
    chapter: chapterReducer,
    user: userReducer,
    comment: CommentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: process.env.NODE_ENV === 'development' ? false : true,
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
