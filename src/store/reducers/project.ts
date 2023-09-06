// types
import { createSlice } from '@reduxjs/toolkit';

// import actions
import { getProjectByAssociate, getProjectDetail } from "../actions/project";
import { ProjectType, ProjectDetail } from '../../types';

interface StateType {
    projects: ProjectType[];
    projectDetail: ProjectDetail[];
}

const initialState: StateType = {
    projects: [],
    projectDetail: []
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
            builder.addCase(getProjectDetail.fulfilled, (state, { payload }) => {
                state.projectDetail = payload;
            });
        }
});

export default project.reducer;
export const { } = project.actions;