import { styled } from "styled-components";
import { NavLink } from "react-router-dom";

import voting from '../assets/vote-table.png';
import breeds from '../assets/pet-breeds.png';
import gallery from '../assets/images-search.png';

const FlexBox = styled.div`
   display: flex;
   justify-content: space-between;
   width: 446px;
   margin-top: 20px;

   @media(max-width: 576px) {
      flex-direction: column;
      align-items: center;
      width: 335px;
      height: 148px;
   }
`;

const ImgBox = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 138px;
   height: 198px;
   background-color: ${(props) => props.color};
   border-radius: var(--rad-lg);
   border: 4px solid rgba(255, 255, 255, 0.60);

   @media(max-width: 576px) {
      display: none;
   }
`;

const Link = styled(NavLink)`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 138px;
   height: 36px;
   font-size: var(--fs-sm);
   font-weight: var(--fw-bold);
   line-height: 16px;
   letter-spacing: 2px;
   text-decoration: none;
   border: none;
   border-radius: var(--rad-sm);
   background-color: ${({theme}) => theme === 'light' ? "var(--bg-light)" : 'var(--grey-color-dark)'};
   color: var(--pink-color);

   &.active {
      background-color: var(--pink-color);
      color: var(--white-color);
   }

   &:hover {
      background-color: var(--pink-color-light);
   }

   @media(max-width: 576px) {
      width: 335px;
   }
`;

const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   row-gap: 10px;
`;

const Navigation = ({theme, closeMenu}) => {
   const handleClick = () => {
      if(closeMenu) {
         closeMenu();
      }
   }

   return (
      <FlexBox>
         <Wrapper>
            <ImgBox color='var(--purple-color)'>
               <img src={voting} alt="voting"/>
            </ImgBox>
            <Link 
               to='/content/voting' 
               theme={theme}
               onClick={handleClick}
            >
               VOTING
            </Link>
         </Wrapper>
         <Wrapper>
            <ImgBox color='var(--green-color)'>
               <img src={breeds} alt="breeds"/>
            </ImgBox>
            <Link 
               to='/content/breeds' 
               theme={theme}
               onClick={handleClick}
            >
               BREEDS
            </Link>
         </Wrapper>
         <Wrapper>
            <ImgBox color='var(--orange-color)'>
               <img src={gallery} alt="gallery"/>
            </ImgBox>
            <Link 
               to='/content/gallery' 
               theme={theme}
               onClick={handleClick}
            >
               GALLERY
            </Link>
         </Wrapper>
      </FlexBox>
   )
}

export { Navigation };