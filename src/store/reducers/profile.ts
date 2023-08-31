// types
import { createSlice } from "@reduxjs/toolkit";

// import actions
import { getUserById } from "../actions/profile";

const profile = createSlice({
  name: "user",
  initialState: { data: null, loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getUserById.rejected, (state) => {
        state.loading = "failed";
        state.error = null;
      });
  },
});

export default profile.reducer;
export const {} = profile.actions;
