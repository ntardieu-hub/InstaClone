import { createSlice } from '@reduxjs/toolkit';

export const likeSlice = createSlice({
    name: 'like',
    initialState: {
        value: [],
    },
    reducers: {
        update: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { update } = likeSlice.actions;

export const selectLike = state => state.like?.value;

export default likeSlice.reducer;