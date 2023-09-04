// types
import { createSlice } from '@reduxjs/toolkit';

// import actions
import { getProjectByAssociate } from "../actions/project";

interface Project {
    contract_number: string
    associate_id: number
    name: string
    master_client_company_id: number
    client_company_name: string
    total_price_contract: number
};

interface StateType {
    projects: Project[]
}

const initialState: StateType = {
    projects: []
};

// ==============================|| SLICE - PROJECT ||============================== //

const project = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getProjectByAssociate.fulfilled, (state, { payload }) => {
                state.projects = payload;
            });
        }
});

export default project.reducer;
export const { } = project.actions;