import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { ImageGrid } from "../components/ImageGrid";
import { BreedImage } from "../components/BreedImage";
import { LinkBack } from "../components/LinkBack";
import { NavSpan } from "../components/NavSpan";
import {ReactComponent as IconUp} from "../assets/sort-up.svg";
import {ReactComponent as IconDown} from "../assets/soft-down.svg";
import { setBreed, setLimit, setOrder, clearOrder } from "../features/filters/filter-slice";
import { useBreeds } from "../features/breeds/use-breeds";
import { Spinner } from "../components/Spinner";


const FlexBox = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 640px;
`;

const BreedSelect = styled.select.attrs({size: 1})`
   padding-left: 10px;
   width: 226px;
   height: 40px;
   border-radius: var(--rad-sm);
   border: none;
   background-color: var(--bg-light);
   color: var(--grey-color);
   outline: none;

   &> option {
      font-size: var(--fs-md);
      font-weight: var(--fw-light);
   }

   &:focus {
      border: 2px solid ${({theme}) => theme === 'light' ? 'var(--pink-color-light)' : 'var(--pink-color)'};
   }
   &:hover {
      border: 2px solid ${({theme}) => theme === 'light' ? 'var(--pink-color-light)' : 'var(--pink-color)'};
   }
`;

const LimitSelect = styled(BreedSelect)`
   width: 101px;
`;

const Order = styled.span`
   cursor: pointer;
   width: 40px;
   height: 40px;
   border-radius: var(--rad-sm);
   background-color: var(--bg-light);
   display: flex;
   justify-content: center;
   align-items: center;

   &:hover {
      border: 2px solid var(--pink-color-light);
      & > svg {
         fill: var(--pink-color);
      }
   }
`;

const Breeds = () => {
   const dispatch = useDispatch();
   const theme = useSelector((state) => state.theme);
   const [breeds, images, status, error, breed, limit, order] = useBreeds();

   const selectBreed = (e) => {
      dispatch(setBreed(e.target.value))
   }

   const selectLimit = (e) => {
      dispatch(setLimit(e.target.value))
   }

   const selectOrder = (value) => {
      if(value === order) {
         dispatch(clearOrder());
      } else {
         dispatch(setOrder(value));
      }
   }

   return (
      <>
         <FlexBox>
            <LinkBack/>
            <NavSpan>BREEDS</NavSpan>
            <BreedSelect 
               defaultValue={breed} 
               onChange={selectBreed}
               theme={theme}
            >
               {breeds.map((item) => {
                  return (
                     <option key={item.id} value={item.id}>{item.name}</option>
                  )
               })}
            </BreedSelect>
            <LimitSelect defaultValue={limit} onChange={selectLimit}>
               <option value="5">Limit: 5</option>
               <option value="10">Limit: 10</option>
               <option value="15">Limit: 15</option>
               <option value="20">Limit: 20</option>
            </LimitSelect>
            <Order value="ASC" onClick={() => selectOrder("ASC")}>
               <IconUp/>
            </Order>
            <Order value="DESC" onClick={() => selectOrder("DESC")}>
               <IconDown/>
            </Order>
         </FlexBox>
         {status === 'loading' && error === null && <Spinner/>}
         {status === 'fulfilled' && error === null && 
            <ImageGrid size={limit}>
               {images.map((item, i) => {
                     return (
                        <BreedImage 
                           key={item.id} 
                           {...item} 
                           grid={i}
                           theme={theme}
                        />
                     )

               })}
            </ImageGrid>
         }
      </>
   )
}

export {Breeds};

