// types
import { createSlice } from '@reduxjs/toolkit';


interface StateType {
  chats: string[]
}

const initialState: StateType = {
  chats: []
};


// ==============================|| SLICE - BANK ||============================== //

const chat = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
});

export default chat.reducer;
export const { } = chat.actions;