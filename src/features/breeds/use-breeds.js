import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadBreeds, loadCatsImages, selectBreeds } from "./breeds-slice";
import { selectFilters } from "../filters/filter-slice";

export const useBreeds = () => {
   const dispatch = useDispatch();
   const {breeds, images, status, error} = useSelector(selectBreeds);
   const {breed, limit, order} = useSelector(selectFilters);


   useEffect(() => {
      if(breeds.length === 1) {
         dispatch(loadBreeds());
      }
      dispatch(loadCatsImages({limit, breed, order}));
   }, [limit, breed, order])
   
   return [breeds, images, status, error, breed, limit, order];
}