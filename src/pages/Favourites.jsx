import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { NavSpan } from "../components/NavSpan";
import { LinkBack } from "../components/LinkBack";
import { ImageGrid } from "../components/ImageGrid";
import { VoteHistory } from "../features/vote/VoteHistory";
import { FavouriteBreedImage } from "../components/BreedImage";
import { FlexBox } from "../components/FlexBox";
import { selectFavourite, getFavourite, deleteFavourite, addHistoryRecord, removeFromLocalFav, removeFromFavourite } from "../features/vote/vote-slice";


const Span = styled(NavSpan)`
   width: 192px;
`

const Grid = styled.div`
   display: grid;
   grid-template-rows: minmax(300px, min-content) min-content;
   row-gap: 40px;
   width: 640px;

   @media(max-width: 576px) {
      justify-content: center;
      width: 335px;
      padding-bottom: 20px;
   }
`;

const Favourites = () => {
   const dispatch = useDispatch();
   const theme = useSelector((state) => state.theme);
   const {favourite, status, error, history} = useSelector(selectFavourite);
   const unFavHistory = history.filter((item) => item.type === 'remove-fav');

   useEffect(() => {
      dispatch(getFavourite());
   }, [])

   const handleClick = (id, imgId) => {
      dispatch(deleteFavourite(id));
      dispatch(addHistoryRecord({type: 'remove-fav', id: imgId}));
      dispatch(removeFromLocalFav(imgId));
      dispatch(removeFromFavourite(id));
   }

   return (
      <>
         <FlexBox>
            <LinkBack/>
            <Span>Favourites</Span>
         </FlexBox>
         <Grid>
            {favourite.length > 0 && 
               <ImageGrid size={favourite.length}>
                  {favourite.map((item, i) => {
                     return (
                        <FavouriteBreedImage
                           key={item.id}
                           url={item.image.url}
                           id={item.image.id}
                           grid={i}
                           unFav={() => handleClick(item.id, item.image_id)}
                           favourite={true}
                           theme={theme}
                        />
                     )
                  })}
               </ImageGrid>
            }
            <VoteHistory 
               history={unFavHistory}
               theme={theme}
            />
         </Grid>
      </>
   )
}

export {Favourites};