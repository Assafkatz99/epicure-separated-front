import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../typs/interfaces/slicersInterfaces";

export const ordersSlicer = createSlice({
  name: "orders",
  initialState: {
    value: [] as IOrder[],
  },
  reducers: {
    setOrder: (state, action: PayloadAction<IOrder>) => {
      state.value.push(action.payload);
    },
  },
});

export const { setOrder } = ordersSlicer.actions;

export default ordersSlicer.reducer;
