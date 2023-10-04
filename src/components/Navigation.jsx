import { styled } from "styled-components";
import { NavLink } from "react-router-dom";

import voting from '../assets/vote-table.png';
import breeds from '../assets/pet-breeds.png';
import gallery from '../assets/images-search.png';

const FlexBox = styled.div`
   margin-top: 20px;
   display: flex;
   justify-content: space-between;
`;

const ImgBox = styled.div`
   background-color: ${(props) => props.color};
   width: 138px;
   height: 198px;
   flex-shrink: 0;
   border-radius: var(--rad-lg);
   border: 4px solid rgba(255, 255, 255, 0.60);
   display: flex;
   justify-content: center;
   align-items: center;
`;


const Link = styled(NavLink)`
   width: 138px;
   height: 36px;
   border: none;
   border-radius: var(--rad-sm);
   background-color: var(--white-color);
   color: var(--pink-color);
   font-size: var(--fs-sm);
   font-weight: var(--fw-bold);
   line-height: 16px;
   letter-spacing: 2px;
   text-decoration: none;
   display: flex;
   justify-content: center;
   align-items: center;

   &.active {
      background-color: var(--pink-color);
      color: var(--white-color);
   }

   &:hover {
      background-color: var(--pink-color-light);
   }
`;

const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   row-gap: 10px;
`;

const Navigation = () => {
   return (
      <FlexBox>
         <Wrapper>
            <ImgBox color='var(--purple-color)'>
               <img src={voting} alt="voting"/>
            </ImgBox>
            <Link to='/content/voting'>VOTING</Link>
         </Wrapper>
         <Wrapper>
            <ImgBox color='var(--green-color)'>
               <img src={breeds} alt="breeds"/>
            </ImgBox>
            <Link to='content/breeds'>BREEDS</Link>
         </Wrapper>
         <Wrapper>
            <ImgBox color='var(--orange-color)'>
               <img src={gallery} alt="gallery"/>
            </ImgBox>
            <Link to='content/gallery'>GALLERY</Link>
         </Wrapper>
      </FlexBox>
   )
}

export { Navigation };