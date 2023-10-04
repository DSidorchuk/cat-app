import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { selectDetails, loadBreedData, clearData } from "./breed-details-slice";

export const useBreedDetails = (breedId) => {
   const dispatch = useDispatch();
   const {descr, photos, status, error} = useSelector(selectDetails);

   useEffect(() => {
      dispatch(loadBreedData(breedId));

      return () => {
         dispatch(clearData());
      }
   }, []);

   return [descr, photos, status, error]
}