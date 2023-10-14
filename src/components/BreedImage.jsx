import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

import {ReactComponent as EmptyHeart} from "../assets/empty-heart.svg";
import {ReactComponent as FullHeart} from "../assets/full-heart.svg";

const Wrapper = styled.div`
   position: relative;
   grid-area: ${(props) => 'p'+ props.grid};
   
   &:before {
      content: '';
      position: absolute;
      top: 0;
      z-index: 0;
      display: block;
      width: 100%;
      height: 100%;
      background-color: var(--pink-color);
      border-radius: var(--rad-lg);
      opacity: 0.6;
   }

   &:hover {
      & > a {
         display: flex;
      }
      &:before {
         z-index: 1;
      }
   }

   @media(max-width: 576px) {
      grid-area: unset;
   }

`;

const StaticWrapper = styled(Wrapper)`
   pointer-events: none;

   &:before {
      display: none;
   }
`;

const FavWrapper = styled(Wrapper)`
   &:hover {
      & > button {
         display: flex;
      }

      &:before {
         z-index: 1;
      }
   }
`;

const BreedLink = styled(Link)`
   position: absolute;
   bottom: 10px;
   left: 50%;
   transform: translateX(-50%);
   z-index: 2;
   display: none;
   justify-content: center;
   align-items: center;
   width: 180px;
   height: 34px;
   font-size: var(--fs-md);
   font-weight: var(--fw-light);
   border-radius: var(--rad-sm);
   background-color: ${({theme}) => theme === 'light' ? "var(--bg-dark)" : 'var(--black-color-light)'};
   text-decoration: none;
   color: var(--pink-color);
`;

const Image = styled.img`
   position: relative;
   width: 100%;
   height: 100%;
   object-fit: cover;
   border-radius: var(--rad-lg);
`;

const UnFavBtn = styled.button`
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   z-index: 2;
   display: none;
   justify-content: center;
   align-items: center;
   width: 40px;
   height: 40px;
   margin: 0;
   padding: 0;
   border: none;
   border-radius: var(--rad-sm);
   background-color: ${({theme}) => theme === 'light' ? 'var(--white-color)' : 'var(--black-color-light)'};
   cursor: pointer;
`;

const BreedImage = ({url, breed, breedId, grid, theme}) => {
   return (
      <Wrapper grid={grid}>
         <Image src={url} alt={breed}/>
         <BreedLink to={`/content/breeds/${breedId}`} theme={theme}>
            {breed}
         </BreedLink>
      </Wrapper>
   )
}

const StaticBreedImage = ({id, url, grid}) => {
   return (
      <StaticWrapper grid={grid}>
         <Image src={url} alt={id}/>
      </StaticWrapper>
   )
}

const FavouriteBreedImage = ({url, id, grid, unFav, favourite, theme}) => {
   const [fav, setFav] = useState(favourite);

   const handleClick = () => {
      setFav(!fav);
      unFav();
   }

   return (
      <FavWrapper grid={grid}>
         <Image src={url} alt={id}/>
         <UnFavBtn onClick={handleClick} theme={theme}>
            {fav ? <FullHeart/> : <EmptyHeart/>}
         </UnFavBtn>
      </FavWrapper>
   )
}

export {BreedImage, StaticBreedImage, FavouriteBreedImage};