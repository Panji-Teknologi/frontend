import { createSlice } from "@reduxjs/toolkit";

// import actions
import { login, register } from "../actions/auth";

interface StateType {
  loading: boolean;
  userInfo: any;
  userToken: null | any;
  error: null | any;
  success: boolean;
}

const initialState: StateType = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

// ==============================|| SLICE - AUTH ||============================== //

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register user
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // login user
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default auth.reducer;
export const {} = auth.actions;
