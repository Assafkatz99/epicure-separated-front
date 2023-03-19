import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IDish } from "../../typs/interfaces/slicersInterfaces";

export const fetchDishes: any = createAsyncThunk(
  "dishes/fetchDishes",
  async () => {
    const response = await axios.get("http://localhost:8000/api/dishes/");
    return response.data;
  }
);

export const dishesSlice = createSlice({
  name: "dishes",
  initialState: {
    initialValue: [],
    value: [],
    current_dishes: [],
  },
  reducers: {
    filterDishes: (state, action) => {
      state.value = state.initialValue.filter((dish: IDish) =>
        action.payload.dishes_id_list.includes(dish.id)
      );

      switch (action.payload.dish_timing) {
        case "breakfast":
          state.value = state.value.filter(
            (dish: IDish) => dish.dishTiming.breakfast
          );
          break;
        case "lunch":
          state.value = state.value.filter(
            (dish: IDish) => dish.dishTiming.lunch
          );
          break;
        case "dinner":
          state.value = state.value.filter(
            (dish: IDish) => dish.dishTiming.dinner
          );
          break;
        case "":
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state, action) => {})
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.value = action.payload;
        state.initialValue = action.payload;

      })
      .addCase(fetchDishes.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const { filterDishes } = dishesSlice.actions;
export default dishesSlice.reducer;
