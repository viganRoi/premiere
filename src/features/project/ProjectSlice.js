import { createSlice } from '@reduxjs/toolkit';
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from './ProjectApi';

const initialState = {
    data: null,
    msg: '',
    status: 'idle',
    modalState: false,
    modalData: null,
    modalStatus: 'idle',
    modalMsg: '',
};

const ProjectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        // Add your reducers here
        resetModalStatus: (state) => {
            state.modalStatus = '';
        },
        resetModalMsg: (state) => {
            state.modalMsg = '';
        },
        resetModalStatusAndMsg: (state) => {
            state.modalStatus = 'idle';
            state.modalMsg = '';
        },
        resetStatus: (state) => {
            state.status = 'idle';
        },
        resetMsg: (state) => {
            state.msg = '';
        },
        resetStatusAndMsg: (state) => {
            state.status = 'idle';
            state.msg = '';
        },
        setProjectModalState: (state, action) => {
            state.modalState = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createProject.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(createProject.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.data = action.payload;
        })
        .addCase(createProject.rejected, (state, action) => {
            state.status = 'rejected';
            state.msg = action.payload;
        })
        .addCase(updateProject.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(updateProject.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.data = action.payload;
        })
        .addCase(updateProject.rejected, (state, action) => {
            state.status = 'rejected';
            state.msg = action.payload;
        })
        .addCase(getProjectById.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(getProjectById.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.data = action.payload;
        })
        .addCase(getProjectById.rejected, (state, action) => {
            state.status = 'rejected';
            state.msg = action.payload;
        })
        .addCase(getAllProjects.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(getAllProjects.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.data = action.payload;
        })
        .addCase(getAllProjects.rejected, (state, action) => {
            state.status = 'rejected';
            state.msg = action.payload;
        })
        .addCase(deleteProject.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(deleteProject.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.data = action.payload;
        })
        .addCase(deleteProject.rejected, (state, action) => {
            state.status = 'rejected';
            state.msg = action.payload;
        })
    }

});

export const {
    resetModalStatus,
    resetModalMsg,
    resetModalStatusAndMsg,
    resetStatus,
    resetMsg,
    resetStatusAndMsg,
    setProjectModalState
 } = ProjectSlice.actions;

export const getProjectData = (state) => state.ProjectSlice.data;
export const getProjectStatus = (state) => state.ProjectSlice.status;
export const getProjectModalState = (state) => state.ProjectSlice.modalState;
export const getProjectModalData = (state) => state.ProjectSlice.modalData;
export const getProjectModalStatus = (state) => state.ProjectSlice.modalStatus;
export const getProjectModalMsg = (state) => state.ProjectSlice.modalMsg;
export const getProjectMsg = (state) => state.ProjectSlice.msg;

export default ProjectSlice.reducer;