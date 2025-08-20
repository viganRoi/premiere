import { createSlice } from '@reduxjs/toolkit';
import { createNews, deleteNews, getAllNews, getNewsById, updateNews } from './NewsApi';

const initialState = {
    data: [],
    msg: '',
    status: 'idle',
    modalState: false,
    modalData: {},
    modalStatus: 'idle',
};

const NewsSlice = createSlice({
    name: 'NewsSlice',
    initialState,
    reducers: {

        // Add your reducers here
        resetNewsModalStatus: (state) => {
            state.modalStatus = 'idle';
        },
        resetNewsModalData: (state) => {
            state.modalData = {};
        },
        setNewsModalStatus: (state, action) => {
            state.modalState = action.payload;
        },
        resetNewsStatus: (state) => {
            state.status = 'idle';
        },
        resetNewsMsg: (state) => {
            state.msg = '';
        },
        resetNewsStatusAndMsg: (state) => {
            state.status = 'idle';
            state.msg = '';
        },
        resetNewsModalStatusAndMsg: (state) => {
            state.modalStatus = 'idle';
            state.modalMsg = '';
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(createNews.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(createNews.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.data = action.payload;
        })
        .addCase(createNews.rejected, (state, action) => {
            state.status = 'rejected';
            state.msg = action.payload;
        })

        // Add updateNews reducer
        .addCase(updateNews.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(updateNews.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.data = action.payload;
        })
        .addCase(updateNews.rejected, (state, action) => {
            state.status = 'rejected';
            state.msg = action.payload;
        })

        .addCase(getAllNews.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(getAllNews.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.data = action.payload;
        })
        .addCase(getAllNews.rejected, (state, action) => {
            state.status = 'rejected';
            state.msg = action.payload;
        })

        .addCase(getNewsById.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(getNewsById.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.data = action.payload;
        })
        .addCase(getNewsById.rejected, (state, action) => {
            state.status = 'rejected';
            state.msg = action.payload;
        })
        // Add deleteNews reducer
        .addCase(deleteNews.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(deleteNews.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.data = action.payload;
        })
        .addCase(deleteNews.rejected, (state, action) => {
            state.status = 'rejected';
            state.msg = action.payload;
        });

    }
});

export const { 
    resetNewsModalStatus, 
    resetNewsModalData, 
    setNewsModalStatus, 
    resetNewsStatus, 
    resetNewsMsg, 
    resetNewsStatusAndMsg, 
    resetNewsModalStatusAndMsg,
 } = NewsSlice.actions;

 export const getNewsData = (state) => state.NewsSlice.data;
export const getNewsStatus = (state) => state.NewsSlice.status;
export const getNewsMsg = (state) => state.NewsSlice.msg;
export const getNewsModalState = (state) => state.NewsSlice.modalState;
export const getNewsModalData = (state) => state.NewsSlice.modalData;
export const getNewsModalStatus = (state) => state.NewsSlice.modalStatus;


export default NewsSlice.reducer;
