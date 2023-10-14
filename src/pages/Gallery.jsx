import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaQuery from "react-responsive";

import { LinkBack } from "../components/LinkBack";
import { NavSpan } from "../components/NavSpan";
import {ReactComponent as Upload} from "../assets/upload.svg";
import {ReactComponent as Update} from "../assets/update.svg";
import { ImageGrid } from "../components/ImageGrid";
import { FavouriteBreedImage } from "../components/BreedImage";
import { UploadModal } from "../components/UploadModal";
import { selectBreeds, loadBreeds, loadCatsImages } from "../features/breeds/breeds-slice";
import { postFavourite, selectFavourite, addHistoryRecord, removeFromLocalFav, deleteFavourite } from "../features/vote/vote-slice";
import { selectFilters, setBreed, setOrder, setLimit } from "../features/filters/filter-slice";


const Span = styled(NavSpan)`
   width: 156px;
`;

const NavWrap = styled.div`
   display: flex;
   justify-content: space-between;
   width: 206px;
`;

const FlexBox = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 640px;

   @media(max-width: 991px) {
      width: 668px;
   }

   @media(max-width: 576px) {
      display: grid;
      grid-auto-row: 40px;
      row-gap: 10px;
      width: 335px;
      padding: 20px 20px 0 20px;
   }
`;

const UploadBtn = styled.button`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 143px;
   height: 40px;
   margin: 0;
   padding: 0 30px;
   border: none;
   border-radius: var(--rad-sm);
   background-color: var(--bg-color);
   cursor: pointer;

   & > span {
      display: block;
      width: 57px;
      text-align: center;
      font-size: var(--fs-sm);
      font-weight: var(--fw-bold);
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--pink-color);
   }

   &:hover {
      background-color: var(--pink-color);

      & > span {
         color: var(--white-color);
      }
      & > svg {
         fill: var(--white-color);
      }
   }

   @media(max-width: 576px) {
      justify-content: center;
      gap: 10px;
      width: 295px;
   }
`;

const Grid = styled.div`
   display: grid;
   grid-template-rows: 156px min-content;
   row-gap: 20px;
   width: 640px;

   @media(max-width: 991px) {
      width: 668px;
   }
   @media(max-width: 576px) {
      grid-template-rows: 335px min-content;
      width: 335px;
      padding: 0 20px;
      margin-top: 10px;
   }
`;

const FilterGrid = styled.div`
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   grid-template-rows: repeat(2, 1fr);
   grid-gap: 10px 20px;
   width: 640px;
   height: 156px;
   padding: 10px 20px 20px 20px;
   border-radius: var(--rad-lg);
   background-color: var(--bg-dark);

   @media(max-width: 991px) {
      width: 668px;
   }
   @media(max-width: 576px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 60px) 40px;
      width: 295px;
      height: 350px;
   }
`;

const InputWrap = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
`;

const Label = styled.label`
   padding-left: 14px;
   font-size: var(--fs-xs);
   font-weight: var(--fw-bold);
   line-height: 18px;
   text-transform: uppercase;
   color: var(--grey-color);
`;

const Select = styled.select.attrs({size: 1})`
   width: 290px;
   height: 40px;
   padding: 0;
   padding-left: 10px;
   font-size: var(--fs-md);
   font-weight: var(--fw-light);
   border: none;
   border-radius: var(--rad-sm);
   background-color: var(--bg-light);
   color: var(--text-color-dark);
   cursor: pointer;

   & > option {
      padding: 0;
   }
   &:focus {
      border: 2px solid ${({theme}) => theme === 'light' ? 'var(--pink-color-light)' : 'var(--pink-color)'};
   }
   &:hover {
      border: 2px solid ${({theme}) => theme === 'light' ? 'var(--pink-color-light)' : 'var(--pink-color)'};
   }

   @media(max-width: 576px) {
      width: 255px;
   }
`;

const LimitWrap = styled.div`
   display: flex;
   justify-content: space-between;
   width: 100%;
`;

const LimitSelect = styled(Select)`
   width: 240px;
`;

const UpdateBtn = styled.button`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 40px;
   height: 40px;
   border: none;
   border-radius: var(--rad-sm);
   background-color: var(--bg-dark);
   cursor: pointer;

   &:hover {
      background-color: var(--pink-color);
      & > svg {
         fill: var(--white-color);
      }
   }
   
   @media(max-width: 576px) {
      width: 255px;
      background-color: var(--bg-light);
   }
`;

const Gallery = () => {
   const dispatch = useDispatch();
   const [show, setShow] = useState(false);
   const {breeds, images, status, error} = useSelector(selectBreeds);
   const {localFav} = useSelector(selectFavourite);
   const theme = useSelector((state) => state.theme);
   const {breed, limit, order} = useSelector(selectFilters);

   const loadImages = () => {
      dispatch(loadCatsImages({limit, breed, order}));
   }

   useEffect(() => {
      if(breeds.length === 1) {
         dispatch(loadBreeds());
      }
      loadImages();
   }, [breed, limit, order])

   const selectBreed = (e) => {
      dispatch(setBreed(e.target.value))
   }

   const selectLimit = (e) => {
      dispatch(setLimit(e.target.value))
   }

   const selectOrder = (e) => {
      dispatch(setOrder(e.target.value));

   }

   const toggleFavourite = (imgId) => {
      const favId = localFav?.[imgId];
      if(favId) {
         dispatch(deleteFavourite(favId));
         dispatch(removeFromLocalFav(imgId));
         dispatch(addHistoryRecord({type: 'remove-fav', id: imgId}))
      } else {
         dispatch(postFavourite({
            image_id: imgId
         }))
         dispatch(addHistoryRecord({type: 'add-fav', id: imgId}))
      }
   }

   const openModal = () => {
      setShow(true);
   }
   const closeModal = () => {
      setShow(false);
   }

   return (
      <>
         <UploadModal 
            show={show} 
            handleClose={closeModal}
            theme={theme}
         />
         <FlexBox>
            <NavWrap>
               <LinkBack/>
               <Span>gallery</Span>
            </NavWrap>
            <UploadBtn onClick={openModal}>
               <Upload/>
               <span>upload</span>
            </UploadBtn>
         </FlexBox>
         <Grid>
            <FilterGrid>
               <InputWrap>
                  <Label>order</Label>
                  <Select defaultValue='RAND' onChange={selectOrder}>
                     <option value='RAND'>Random</option>
                     <option value='DESC'>Desc</option>
                     <option value='ASC'>Asc</option>
                  </Select>
               </InputWrap>
               <InputWrap>
                  <Label>type</Label>
                  <Select defaultValue='static'>
                     <option value='static'>Static</option>
                     <option value='all'>All</option>
                     <option value='animated'>Animated</option>
                  </Select>
               </InputWrap>
               <InputWrap>
                  <Label>breed</Label>
                  <Select defaultValue='all' onChange={selectBreed}>
                     {breeds.map((item) => {
                        return (
                           <option 
                              key={item.id} 
                              value={item.id}
                           >
                              {item.name}
                           </option>
                        )
                     })}
                  </Select>
               </InputWrap>
               <MediaQuery minWidth={577}>
                  <InputWrap>
                     <Label>limit</Label>
                     <LimitWrap>
                        <LimitSelect defaultValue={limit} onChange={selectLimit}>
                           <option value="5">5 items per page</option>
                           <option value="10">10 items per page</option>
                           <option value="15">15 items per page</option>
                           <option value="20">20 items per page</option>
                        </LimitSelect>
                        <UpdateBtn onClick={loadImages}>
                           <Update/>
                        </UpdateBtn>
                     </LimitWrap>
                  </InputWrap>
               </MediaQuery>
               <MediaQuery maxWidth={576}>
                  <>
                     <InputWrap>
                        <Label>limit</Label>
                        <Select 
                           defaultValue={limit} 
                           onChange={selectLimit}
                        >
                           <option value="5">5 items per page</option>
                           <option value="10">10 items per page</option>
                           <option value="15">15 items per page</option>
                           <option value="20">20 items per page</option>
                        </Select>
                     </InputWrap>
                     <UpdateBtn onClick={loadImages}>
                           <Update/>
                     </UpdateBtn>
                  </>
               </MediaQuery>

            </FilterGrid>
            {status === 'fulfilled' && !error && <ImageGrid size={limit}>
                  {images.map((item, i) => {
                     if(i < limit) {
                        return (
                           <FavouriteBreedImage
                              key={item.id}
                              url={item.url}
                              id={item.id}
                              grid={i}
                              unFav={() => toggleFavourite(item.id)}
                              favourite={localFav?.[item.id]}
                           />
                        )
                     }
                  })}
            </ImageGrid>}
         </Grid>
      </>
   )
}

export {Gallery};