// types
import { createSlice } from '@reduxjs/toolkit';

// import actions
import { getProjectByAssociate, getProjectDetail, handleByProject } from "../actions/project";
import { ProjectType, ProjectDetail, HandleByProject } from '../../types';

interface StateType {
    projects: ProjectType[];
    projectDetail: ProjectDetail[];
    handleBy: HandleByProject[]
    
}

const initialState: StateType = {
    projects: [],
    projectDetail: [],
    handleBy: []
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
            builder.addCase(handleByProject.fulfilled, (state, { payload }) => {
                state.handleBy = payload;
            });
        }
});

export default project.reducer;
export const { } = project.actions;