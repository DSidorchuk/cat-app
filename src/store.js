import { configureStore } from "@reduxjs/toolkit";

import { filterReducer } from "./features/filters/filter-slice";
import { breedsReducer } from "./features/breeds/breeds-slice";
import { detailsReducer } from "./features/breed-details/breed-details-slice";
import { voteReducer } from "./features/vote/vote-slice";
import { uploadReducer } from "./features/upload/upload-slice";
import { themeReducer } from "./features/theme/theme-slice";
import { httpRequest } from './api';

export const store = configureStore({
   reducer: {
      filters: filterReducer,
      breeds: breedsReducer,
      details: detailsReducer,
      vote: voteReducer,
      upload: uploadReducer,
      theme: themeReducer,
   },
   devTools: true,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
         extraArgument: httpRequest(),
      },
   })
})
