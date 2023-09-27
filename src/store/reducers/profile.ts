// types
import { createSlice } from "@reduxjs/toolkit";

// import actions
import { getUserById } from "../actions/profile";

// types
import { Profile } from "../../types";

interface StateType {
  profiles: Profile | null;
}

const initialState: StateType = {
  profiles: null,
};

// ==============================|| SLICE - PROJECT ||============================== //

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // clearProfiles
    clearProfiles(state, { payload }) {
      state.profiles = payload
    },

    // update profile
    profileUpdate(state, { payload }) {
      state.profiles = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserById.fulfilled, (state, { payload }) => {
      state.profiles = payload;
    });
  },
});

export default profile.reducer;
export const { clearProfiles, profileUpdate } = profile.actions;
