import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { NavSpan } from "../components/NavSpan";
import { LinkBack } from "../components/LinkBack";
import { ImageGrid } from "../components/ImageGrid";
import { StaticBreedImage } from "../components/BreedImage";
import { selectFavourite, getVote } from "../features/vote/vote-slice";
import { Spinner } from "../components/Spinner";
import { FlexBox } from "../components/FlexBox";


const Span = styled(NavSpan)`
   width: 119px;
`;

const Title = styled.h5`
   margin: 0;
   padding: 0 20px;
   width: 640px;
   height: 60px;
   border-radius: var(--rad-sm);
   background: var(--grey-color-light);
   color: var(--grey-color);
   font-size: var(--fs-md);
   font-weight: var(--fw-light);
   line-height: 24px;
   display: flex;
   align-items: center;
`;

const Likes = ({rate}) => {
   const dispatch = useDispatch();
   const {votes, status, error} = useSelector(selectFavourite);
   const images = votes.filter((item) => item.value === rate);

   useEffect(() => {
      dispatch(getVote());
   }, [])

   return (
      <>
         <FlexBox>
            <LinkBack/>
            <Span>{rate > 0 ? 'LIKES' : 'DISLIKES'}</Span>
         </FlexBox>
         {status === 'loading' && <Spinner/>}
         {status === 'fulfilled' && votes.length === 0 && <Title>No item found</Title>}
         {status === 'fulfilled' && !error && votes.length > 0 && 
            <ImageGrid 
               size={images.length}
            >
               {images.map((item, i) => {
                     return (
                        <StaticBreedImage 
                           key={item.id}
                           id={item.image.id}
                           url={item.image.url}
                           grid={i}
                        />
                     )
               })}
            </ImageGrid>
         }
      </>
   )
}

export {Likes};