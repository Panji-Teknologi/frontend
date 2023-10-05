// types
import { createSlice } from '@reduxjs/toolkit';

// import actions
import { getBankDestination, getSalesMaster } from "../actions/bank"

interface Bank {
  "id": number
  "bank_code": string
  "nama_bank_destination": string
  "status": number
}

export type Sales = {
  "master_sales_employee_id": number
  "sales_name": string
  "company"?: string
  "status"?: number
  "create_date"?: Date
  "create_user"?: number
  "cycle_date"?: Date
  "cycle_user"?: number
}

interface StateType {
  banks: Bank[]
  sales: Sales[]
}

const initialState: StateType = {
  banks: [],
  sales: []
};


// ==============================|| SLICE - BANK ||============================== //

const bank = createSlice({
  name: 'bank',
  initialState,
  reducers: {},
  extraReducers:
    (builder) => {
      builder.addCase(getBankDestination.fulfilled, (state, action) => {
        state.banks = action.payload;
      });

      builder.addCase(getSalesMaster.fulfilled, (state, action) => {
        state.sales = action.payload;
      });
    }
});

export default bank.reducer;
export const { } = bank.actions;