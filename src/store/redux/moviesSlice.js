import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as movieService from "../../services/movieService";

// THUNK: GET
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const res = await movieService.getMovies();
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

// THUNK: ADD
export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await movieService.createMovie(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

// THUNK: EDIT
export const editMovie = createAsyncThunk(
  "movies/editMovie",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await movieService.updateMovieApi(id, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

// THUNK: DELETE
export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id, { rejectWithValue }) => {
    try {
      await movieService.deleteMovieApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setMovies(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed fetching movies";
      })

      // ADD
      .addCase(addMovie.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.error = action.payload || "Failed add movie";
      })

      // EDIT
      .addCase(editMovie.fulfilled, (state, action) => {
        state.items = state.items.map((m) =>
          m.id === action.payload.id ? action.payload : m
        );
      })
      .addCase(editMovie.rejected, (state, action) => {
        state.error = action.payload || "Failed edit movie";
      })

      // DELETE
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.items = state.items.filter((m) => m.id !== action.payload);
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.error = action.payload || "Failed delete movie";
      });
  },
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
