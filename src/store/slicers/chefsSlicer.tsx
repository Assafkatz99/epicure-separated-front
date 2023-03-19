import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IChef } from "../../typs/interfaces/slicersInterfaces";

export const fetchChefs: any = createAsyncThunk(
  "chefs/fetchChefs",
  async () => {
    const response = await axios.get("http://localhost:8000/api/chefs/");
    return response.data;
  }
);

const chefsSlice = createSlice({
  name: "chefs",
  initialState: {
    initialValue: [],
    value: [],
    chef_of_the_week_id: 5,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChefs.pending, (state, action) => {})
      .addCase(fetchChefs.fulfilled, (state, action) => {
        state.value = action.payload;
        state.initialValue = action.payload;

      })
      .addCase(fetchChefs.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export default chefsSlice.reducer;
