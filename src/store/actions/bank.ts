import Axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL } from '../../constants/data';

const getBankDestination = createAsyncThunk(
  'bank/fetch',
  async () => {
    const response = await Axios.get(`${API_URL}/get_bank_destination`);
    return response.data.data
  }
)

export { getBankDestination }