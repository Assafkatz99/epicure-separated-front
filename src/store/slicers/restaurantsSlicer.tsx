import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IRestaurant } from "../../typs/interfaces/slicersInterfaces";

export const fetchRestaurants: any = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async () => {
    const response = await axios.get("http://localhost:8000/api/restaurants/");
    return response.data;
  }
);

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: {
    initialValue: [],
    value: [],
  },
  reducers: {
    filter: (state, action) => {
      switch (action.payload) {
        case "all":
          state.value = state.initialValue;
          break;
        case "new":
          state.value = state.initialValue.filter(
            (rest: IRestaurant) => rest.opening_year >= new Date().getFullYear()
          );
          break;
        case "most_popular":
          state.value = state.initialValue.filter(
            (rest: IRestaurant) => rest.rating > 4
          );
          break;
        case "open_now":
          state.value = state.initialValue.filter(
            (rest: IRestaurant) =>
              rest.hours[0] < new Date().getHours() &&
              rest.hours[1] > new Date().getHours()
          );
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state, action) => {})
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.value = action.payload;
        state.initialValue = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const { filter } = restaurantsSlice.actions;

export default restaurantsSlice.reducer;
