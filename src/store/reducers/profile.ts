// types
import { createSlice } from "@reduxjs/toolkit";

// import actions
import { getUserById } from "../actions/profile";

interface Profile {
  associate_id: number;
  name: string;
  address: string;
  job: string;
  email: string;
  no_hp: string;
}

interface StateType {
  profiles: Profile[];
}

const initialState: StateType = {
  profiles: [],
};

// ==============================|| SLICE - PROJECT ||============================== //

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserById.fulfilled, (state, { payload }) => {
      console.log("payload profile", payload);
      state.profiles = payload;
    });
  },
});

export default profile.reducer;
export const {} = profile.actions;
