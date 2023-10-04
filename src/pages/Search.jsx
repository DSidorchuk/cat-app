import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { NavSpan } from "../components/NavSpan";
import { LinkBack } from "../components/LinkBack";
import { ImageGrid } from "../components/ImageGrid";
import { BreedImage } from "../components/BreedImage";
import { FlexBox } from "../components/FlexBox";
import { loadCatsImages, selectBreeds, loadBreeds } from "../features/breeds/breeds-slice";


const Title = styled.h5`
   padding: 0;
   margin: 0;
   margin-bottom: 20px;
   color: var(--grey-color);
   font-size: var(--fs-lg);
   font-weight: var(--fw-light);

   & > span {
      color: var(--black-color);
      font-weight: var(--fw-bold);
   }
`;

const Search = () => {
   const dispatch = useDispatch();
   const {breed} = useParams();
   const {breeds, images, status, error} = useSelector(selectBreeds);
   const limit = 5;
   const order = 'RAND';

   const breedObj = breeds.find((item) => item.name.toLowerCase() === breed.toLowerCase());

   useEffect(() => {
      if(breeds.length === 1) {
         dispatch(loadBreeds());
      }
      if(breedObj) {
         dispatch(loadCatsImages({limit, breed: breedObj.id, order}))
      }
   }, []);
   
   return (
      <>
         <FlexBox>
            <LinkBack/>
            <NavSpan>SEARCH</NavSpan>
         </FlexBox>
         <div>
            <Title>Search results for: 
               <span>{breedObj ? breedObj.name : breed}</span>
            </Title>
            <ImageGrid size={limit}>
               {breedObj && images.length > 0 && images.map((item, i) => {
                  return (
                     <BreedImage key={item.id} {...item} grid={i}/>
                  )
               })}
            </ImageGrid>
         </div>
      </>
   )
}

export {Search};