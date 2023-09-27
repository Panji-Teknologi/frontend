// types
import { createSlice } from '@reduxjs/toolkit';

// import actions
import { getBankDestination } from "../actions/bank"

interface Bank {
    "id": number
    "bank_code": string
    "nama_bank_destination": string
    "status": number
}

interface StateType {
    banks: Bank[]
}

const initialState: StateType = {
    banks: []
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
        }
});

export default bank.reducer;
export const { } = bank.actions;