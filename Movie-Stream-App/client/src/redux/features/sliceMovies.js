import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import movieManager from "../movieManager";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
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

export const searchMovie = createAsyncThunk(
  "movies/searchMovie",
  async (text) => {
    return axios.get(`${API_URL}/search/?text=${text}`).then((res) => res.data);
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    resetSearch: (state) => {
      state.movies = [];
      state.page = 0;
      state.loadingStat = "idle";
    },
    // searchMovie: (state, action) => {
    //   let results = state.movies.filter((movie) =>
    //     movie.name.includes(action.payload)
    //   );
    //   state.movies = [...results];
    // },
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
    // action type movies/searchMovie/failed state transition
    builder.addCase(searchMovie.rejected, (state) => {
      state.loadingStat = "failed";
    });
    builder.addCase(searchMovie.pending, (state) => {
      state.loadingStat = "pending";
    });
    // action type movies/searchMovie/loaded state transition
    builder.addCase(searchMovie.fulfilled, (state, action) => {
      let { title, page, pageCount, movies } = action.payload;
      state.movies = movies;
      state.title = title;
      state.loadingStat = "success";
      state.page = page;
      state.pageCount = pageCount;
    });
    // action type movies/searchMovie/failed state transition
    builder.addCase(fetchMovies.rejected, (state) => {
      state.loadingStat = "failed";
    });
  },
});
export const resetSearch = movieSlice.actions.resetSearch;
export default movieSlice.reducer;
