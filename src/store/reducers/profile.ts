// types
import { createSlice } from "@reduxjs/toolkit";

// import actions
import { getUserById } from "../actions/profile";

// types
import { Profile } from "../../types";

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
      state.profiles = payload;
    });
  },
});

export default profile.reducer;
export const { } = profile.actions;
