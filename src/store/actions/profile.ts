import Axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/data";

interface ProjectByAssociate {
  token: string;
  tokenUserId: number | null;
}

const getUserById = createAsyncThunk(
  "user/getUserById",
  async ({ token, tokenUserId }: ProjectByAssociate, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${API_URL}/${tokenUserId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      console.log('RES : ', response)

      return response.data.data[0];
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.status) {
        return rejectWithValue(error.response.data.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export { getUserById };
