import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const uploadPhoto = createAsyncThunk(
   '@@upload/post-photo',
   async (file, {extra}) => {
      return await extra.postPhoto(file);
   }
);

const initialState = {
   photo: '',
   status: 'idle',
   error: null,
}

const uploadSlice = createSlice({
   name: '@@upload',
   initialState,
   reducers: {
      clearUpload: () => initialState
   },
   extraReducers: (builder) => {
      builder
         .addCase(uploadPhoto.fulfilled, (state, action) => {
            state.photo = action.payload;
            state.status = 'fulfilled';
         })
         .addCase(uploadPhoto.pending, (state) => {
            state.status = 'loading';
            state.error = null;
         })
         .addCase(uploadPhoto.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
         })
   }
})

export const uploadReducer = uploadSlice.reducer;
export const {clearUpload} = uploadSlice.actions;
export const selectUpload = (state) => state.upload;