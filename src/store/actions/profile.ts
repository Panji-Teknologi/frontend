import Axios, { AxiosRequestConfig } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/data";

type Token = string

const getUserById = createAsyncThunk(
  "user/getUserById",
  async ({ token, id }: { token: Token; id: number | null }, thunkAPI) => {
    // Membuat konfigurasi permintaan dengan header token
    const config: AxiosRequestConfig = {
      headers: {
        'Authorization': `${token}`,
      },
    };
    try {
      const response = await Axios.get(`${API_URL}/${id}`, config);
      if (!response) {
        throw new Error("Gagal mengambil data pengguna");
      }
      const data = await response?.data?.data[0]
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { getUserById };
