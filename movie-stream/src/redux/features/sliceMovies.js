import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import movieManager from "../movieManager";

const API_URL = process.env.REACT_APP_API_URL;
// console.log(API_URL);

const initialState = {
  title: "",
  page: 0,
  pageCount: 0,
  movies: [],
  loadingStat: "idle",
};

/// async thunk function to generate pending, fullfiled or rejected action types//
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (page) => {
    return axios.get(`${API_URL}/?page=${page}`).then((res) => res.data);
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // action type pending state transition
    builder.addCase(fetchMovies.pending, (state) => {
      state.loadingStat = "pending";
    });
    // action type movies/fetchMovies/loaded state transition
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      let { title, page, pageCount, movies } = action.payload;
      let storedMovies = movieManager(state.movies, movies);
      state.movies = storedMovies;
      state.title = title;
      state.loadingStat = "success";
      state.page = page;
      state.pageCount = pageCount;
    });
    // action type movies/fetchMovies/failed state transition
    builder.addCase(fetchMovies.rejected, (state) => {
      state.loadingStat = "failed";
    });
  },
});

export default movieSlice.reducer;
