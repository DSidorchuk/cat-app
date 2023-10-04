import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

export const loadBreedData = createAsyncThunk(
   '@@details/load-data',
   async (id, {extra}) => {
      return await extra.getBreedData(id)
   }
)

const initialState = {
   descr: {},
   photos: [],
   status: 'idle',
   error: null
}

const detailsSlice = createSlice({
   name: '@@details',
   initialState,
   reducers: {
      clearData: () => initialState
   },
   extraReducers: (builder) => {
      builder
         .addCase(loadBreedData.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.photos = action.payload.map((item) => {
               return {
                  id: item.id,
                  url: item.url,
               }
            });
            const breed = action.payload[0].breeds[0];
            state.descr = {
                  name: breed.name,
                  temperament: breed.temperament,
                  origin: breed.origin,
                  weight: breed.weight.metric,
                  life: breed.life_span,
                  description: breed.description.split('.')[0],
               }
         })
         .addCase(loadBreedData.pending, (state) => {
            state.status = 'loading';
            state.error = null;
         })
         .addCase(loadBreedData.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload || action.meta.error;
         })
   }
})

export const {clearData} = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;
export const selectDetails = (state) => state.details;
