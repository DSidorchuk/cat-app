import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

export const loadBreeds = createAsyncThunk(
   '@@breeds/load-breeds',
   async (_, {extra}) => {
      return await extra.getBreeds();
   }
)

export const loadCatsImages = createAsyncThunk(
   '@@breeds/load-cats-images',
   async ({limit, breed, order}, {extra}) => {
      return await extra.getImages(limit, breed, order)
   }
)

const initialState = {
   breeds: [{id: 'all', name: 'All breeds'}],
   images: [],
   status: 'idle',
   error: null,
}

const breedsSlice = createSlice({
   name: 'breeds',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(loadBreeds.fulfilled, (state, action) => {
            const breedArr = action.payload.map(item => {
               return {
                  id: item.id,
                  name: item.name,
               }
            })
            state.breeds = state.breeds.concat(breedArr);
            state.status = 'fulfilled'
         })
         .addCase(loadCatsImages.fulfilled, (state, action) => {
            state.images = action.payload.map(item => {
               return {
                  breed: item.breeds[0]?.name,
                  breedId: item.breeds[0].id,
                  id: item.id,
                  url: item.url,
               }
            })
            state.status = 'fulfilled';
         })
         .addCase(loadCatsImages.pending, (state) => {
            state.status = 'loading';
            state.error = null;
         })
         .addCase(loadCatsImages.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload || action.meta.error;
         })
   }
});

export const breedsReducer = breedsSlice.reducer;
export const selectBreeds = (state) => state.breeds;

