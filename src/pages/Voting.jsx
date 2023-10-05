import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { NavSpan } from "../components/NavSpan";
import { LinkBack } from "../components/LinkBack";
import { Photo } from "../components/Photo";
import { VoteBox } from "../components/VoteBox";
import { VoteHistory } from "../features/vote/VoteHistory";
import { selectBreeds, loadCatsImages } from "../features/breeds/breeds-slice";
import { selectFilters } from "../features/filters/filter-slice";
import { postFavourite, deleteFavourite, removeFromLocalFav, selectFavourite, addHistoryRecord, postVote } from "../features/vote/vote-slice";
import { Spinner } from "../components/Spinner";
import { FlexBox } from "../components/FlexBox";


const Grid = styled.div`
   display: grid;
   grid-template-rows: 360px min-content;
   row-gap: 52px;
   position: relative;
`;

const Voting = () => {
   const dispatch = useDispatch();
   const [index, setIndex] = useState(0);
   const {breed, limit, order} = useSelector(selectFilters);
   const {images, status, error} = useSelector(selectBreeds);
   const {localFav, history} = useSelector(selectFavourite);
   const theme = useSelector((state) => state.theme);
   const imgId = images[index]?.id;
   const favId = localFav?.[imgId];


   useEffect(() => {
      if(images.length === 0) {
         dispatch(loadCatsImages({limit, breed, order}));
      }
   }, [])

   const toggleFavourite = () => {
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

   const onLikeImg = (rate) => {
      if(rate > 0) {
         dispatch(postVote({
            image_id: imgId,
            value: 1,
         }));
         dispatch(addHistoryRecord({type: 'like', id: imgId}))
      } else {
         dispatch(postVote({
            image_id: imgId,
            value: -1,
         }));
         dispatch(addHistoryRecord({type: 'dislike', id: imgId}))
      }
      if(index === images.length - 1) {
         setIndex(0)
      } else {
         setIndex(index + 1)
      }
   }

   return (
      <>
         <FlexBox>
            <LinkBack/>
            <NavSpan>Voting</NavSpan>
         </FlexBox>
         {status === 'loading' && <Spinner/>}
         {status === 'fulfilled' && !error && <Grid>
            <Photo src={images[index].url}/>
            <VoteBox 
               active={favId}
               onFav={toggleFavourite}
               onDown={() => onLikeImg(-1)}
               onUp={() => onLikeImg(1)}
               theme={theme}
            />
            <VoteHistory 
               history={history}
               theme={theme}
            />
         </Grid>}
      </>
   )
}

export {Voting};