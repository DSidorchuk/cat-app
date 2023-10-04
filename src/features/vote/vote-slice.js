import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import  {getTime } from '../../utilities/getTime'

export const postFavourite = createAsyncThunk(
   '@@vote/post-favourite',
   async (item, {extra}) => {
      return await extra.postFavourite(item);
   }
);

export const getFavourite = createAsyncThunk(
   '@@vote/get-favourite',
   async (_, {extra}) => {
      return await extra.getFavourite();
   }
);

export const deleteFavourite = createAsyncThunk(
   '@@vote/delete-favourite',
   async (favId, {extra}) => {
      return await extra.deleteFavourite(favId);
   }
);

export const postVote = createAsyncThunk(
   '@@vote/post-vote',
   async (item, {extra}) => {
      return await extra.postVote(item);
   } 
); 

export const getVote = createAsyncThunk(
   '@@vote/get-vote',
   async (_, {extra}) => {
      return await extra.getVote();
   }
);

const initialState = {
   history: [],
   votes: [],
   favourite: [],
   localFav: {},
   status: 'idle',
   error: null,
}

const voteSlice = createSlice({
   name: '@@vote',
   initialState,
   reducers: {
      addHistoryRecord: {
         reducer: (state, action) => {
            state.history.push({...action.payload});
         },
         prepare: ({type, id}) => ({
            payload: {
               type,
               id,
               time: getTime()
            }
         })
      },
      removeFromLocalFav: (state, action) => {
         delete state.localFav[action.payload];
      },
      removeFromFavourite: (state, action) => {
         state.favourite = state.favourite.filter((item) => item.id !== action.payload)
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(postFavourite.fulfilled, (state, action) => {
            state.localFav[action.meta.arg.image_id] = action.payload.id;
            state.status = 'fulfilled';
         })
         .addCase(getVote.fulfilled, (state, action) => {
            state.votes = action.payload;
            state.status = 'fulfilled';
         })
         .addCase(getFavourite.fulfilled, (state, action) => {
            state.favourite = action.payload;
            state.status = 'fulfilled';
         })
         .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
            state.status = 'loading';
            state.error = null;
         })
         .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
            state.status = 'rejected';
            state.error = action.payload || action.meta.error;
         })
   }
})

export const voteReducer = voteSlice.reducer;
export const {addHistoryRecord, addToLocalFav, removeFromLocalFav, removeFromFavourite} = voteSlice.actions;
export const selectFavourite = (state) => state.vote;
export const selectHistory = (state) => state.vote.history;