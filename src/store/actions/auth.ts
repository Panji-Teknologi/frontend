import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Axios from "axios";
import { auth } from "../../firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/data";

interface RegisterType {
  name: string;
  email: string;
  address: string;
  job: string;
  no_hp: string;
  bank_code: string;
  bank_atas_nama: string;
  no_rek_associate: string;
  ktp_image: File | any;
  create_date: Date | any;
  term_of_service_signature: string;
  master_sales_employee_id: string;
  sumber_informasi: string;
}

interface LoginType {
  no_hp: string;
}

const setUpRecaptcha = (number: string) => {
  const recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {}
  );

  recaptchaVerifier.render();
  return signInWithPhoneNumber(auth, number, recaptchaVerifier);
};

const register = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      email,
      address,
      job,
      no_hp,
      bank_code,
      bank_atas_nama,
      no_rek_associate,
      ktp_image,
      create_date,
      term_of_service_signature,
      master_sales_employee_id,
      sumber_informasi,
    }: RegisterType,
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("job", job);
      formData.append("no_hp", no_hp);
      formData.append("bank_code", bank_code);
      formData.append("bank_atas_nama", bank_atas_nama);
      formData.append("no_rek_associate", no_rek_associate);
      formData.append("ktp_image", ktp_image);
      formData.append("create_date", create_date);
      formData.append("term_of_service_signature", term_of_service_signature);
      formData.append("master_sales_employee_id", master_sales_employee_id);
      formData.append("sumber_informasi", sumber_informasi);

      await Axios.post(`${API_URL}/register_associate`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
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

const login = createAsyncThunk(
  "auth/login",
  async ({ no_hp }: LoginType, { rejectWithValue }) => {
    try {
      const data = {
        no_hp,
      };

      const response = await Axios.post(
        `${API_URL}/save_token_associate`,
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data;
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export { setUpRecaptcha, register, login };
