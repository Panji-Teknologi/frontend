import Axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL } from '../../constants/data';

interface ProjectByAssociate {
    token: string;
    tokenUserId: number | null
}

const getProjectByAssociate = createAsyncThunk(
    'project/by-associate',
    async ({ token, tokenUserId }: ProjectByAssociate, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${API_URL}/get_project_by_associate_id_distinct/${tokenUserId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            });

            return response.data.data;
        } catch (error: any) {
            // return custom error message from backend if present
            if (error.response && error.response.data.status) {
                return rejectWithValue(error.response.data.status)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);

export { getProjectByAssociate }