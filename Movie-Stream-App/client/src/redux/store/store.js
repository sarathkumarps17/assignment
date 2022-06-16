import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger";

import moviesReducer from "../features/sliceMovies";

const store = configureStore({
  reducer: moviesReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
