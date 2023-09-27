import Axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/data";
import { Profile } from "../../types";

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

const updateProfile = createAsyncThunk(
  "user/update",
  async ({
    associate_id,
    name,
    job,
    email,
    bank_code,
    address,
    no_hp,
    bank_atas_nama,
    no_rek_associate,
    ktp_image,
    token
  }: Profile, { rejectWithValue }) => {
    try {
      const data = {
        associate_id,
        name,
        job,
        email,
        bank_code,
        address,
        no_hp,
        bank_atas_nama,
        no_rek_associate,
        ktp_image,
      }

      const response = await Axios.post(`${API_URL}/update_profile`, data, {
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        }
      });

      return response.data.data
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.status) {
        return rejectWithValue(error.response.data.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)

export { getUserById, updateProfile };
