import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";


import btnBg from "../assets/unfavourite.png"
import {ReactComponent as EmptyHeart} from "../assets/empty-heart.svg";
import {ReactComponent as FullHeart} from "../assets/full-heart.svg";

const Wrapper = styled.div`
   grid-area: ${(props) => 'p'+ props.grid};
   position: relative;

   &:before {
      content: '';
      width: 100%;
      height: 100%;
      display: block;
      background-color: var(--pink-color);
      opacity: 0.6;
      border-radius: var(--rad-lg);
      position: absolute;
      top: 0;
      z-index: 0;
   }

   &:hover {
      & > a {
         display: flex;
      }
      &:before {
         z-index: 1;
      }
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
   width: 180px;
   height: 34px;
   border-radius: var(--rad-sm);
   background-color: var(--white-color);
   text-decoration: none;
   color: var(--pink-color);
   font-size: var(--fs-md);
   font-weight: var(--fw-light);
   display: none;
   justify-content: center;
   align-items: center;
   position: absolute;
   bottom: 10px;
   left: 50%;
   transform: translateX(-50%);
   z-index: 2;
`;

const Image = styled.img`
   width: 100%;
   height: 100%;
   object-fit: cover;
   border-radius: var(--rad-lg);
   position: relative;
`;

const UnFavBtn = styled.button`
   margin: 0;
   padding: 0;
   display: none;
   border: none;
   border-radius: var(--rad-sm);
   // background-image: url(${btnBg});
   background-color: var(--white-color);
   justify-content: center;
   align-items: center;
   width: 40px;
   height: 40px;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   z-index: 2;
   cursor: pointer;
`;

const BreedImage = ({url, id, breed, breedId, grid}) => {
   return (
      <Wrapper grid={grid}>
         <Image src={url} alt={breed}/>
         <BreedLink to={`/content/breeds/${breedId}`}>{breed}</BreedLink>
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

const FavouriteBreedImage = ({url, id, grid, unFav, favourite}) => {
   const [fav, setFav] = useState(favourite);

   const handleClick = () => {
      setFav(!fav);
      unFav();
   }

   return (
      <FavWrapper grid={grid}>
         <Image src={url} alt={id}/>
         <UnFavBtn onClick={handleClick}>
            {fav ? <FullHeart/> : <EmptyHeart/>}
         </UnFavBtn>
      </FavWrapper>
   )
}

export {BreedImage, StaticBreedImage, FavouriteBreedImage};