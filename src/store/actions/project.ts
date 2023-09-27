import Axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_URL } from "../../constants/data";

interface ProjectByAssociate {
  token: string;
  tokenUserId: number | null;
}

interface ProjectDetail {
  token: string;
  tokenUserId: number | null;
  contract: string;
}

interface HandleBy {
  token: string;
  associate_id: number;
  project_id: number;
  handle_by: number;
}

const getProjectByAssociate = createAsyncThunk(
  "project/by-associate",
  async ({ token, tokenUserId }: ProjectByAssociate, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${API_URL}/get_project_by_associate_id_distinct/${tokenUserId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      return response.data.data;
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

const getProjectDetail = createAsyncThunk(
  "project/detail",
  async (
    { token, tokenUserId, contract }: ProjectDetail,
    { rejectWithValue }
  ) => {
    try {
      const response = await Axios.get(
        `${API_URL}/get_project_by_contract_number/${tokenUserId}&${contract}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      return response.data.data;
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

const handleByProject = createAsyncThunk(
  "project/handle-project",
  async (
    {
      token,
      associate_id,
      project_id,
      handle_by,
    }: HandleBy,
    { rejectWithValue }
  ) => {
    try {
      const data = {
        token,
        associate_id,
        project_id,
        handle_by,
      };

      const response = await Axios.post(`${API_URL}/project_handle_by`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

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

export { getProjectByAssociate, getProjectDetail, handleByProject };
