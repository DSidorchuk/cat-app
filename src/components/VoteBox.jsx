import { styled } from "styled-components";

import {ReactComponent as IconPositive} from "../assets/positive.svg";
import {ReactComponent as IconHeart}from "../assets/heart.svg";
import {ReactComponent as IconNegative}  from "../assets/negative.svg";
import {ReactComponent as IconWhiteheart} from "../assets/white-heart.svg";

const Wrapper = styled.div`
   display: flex;
   justify-content: space-between;
   width: 248px;
   height: 80px;
   background-color: var(--white-color);
   border-radius: var(--rad-lg);
   border: 4px solid ${({theme}) => theme === 'light' ? 'var(--bg-light)' : 'var(--black-color-light)'};
   overflow: hidden;
   position: absolute;
   top: 320px;
   left: 50%;
   transform: translateX(-50%);
`;

const BtnWrapper = styled.div`
   position: relative;
   cursor: pointer;

   & > svg {
      fill: var(--white-color);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      
   }

   &:hover {
      & > button {
         opacity: 0.3;
      }
      & > svg {
         fill: ${(props) => props.color}; 
      }
   }
`;

const Button = styled.button`
   padding: 0;
   width: 77px;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   border: none;
   position: relative;
`;

const UpBtn = styled(Button)`
   background-color: var(--green-color);
`;

const FavBtn = styled(Button)`
   width: 78px;
   background-color: var(--pink-color);
`;

const DownBtn = styled(Button)`
   background-color: var(--orange-color);
`;

const VoteBox = ({onUp, onFav, onDown, active, theme}) => {
   const FavoriteIcon = () => active ? <IconWhiteheart/> : <IconHeart/>;

   return (
      <Wrapper theme={theme}>
         <BtnWrapper 
            color='var(--green-color)'
            onClick={onUp}
         >
            <UpBtn />
            <IconPositive/>
         </BtnWrapper>
         <BtnWrapper 
            color='var(--pink-color)'
            onClick={onFav}
         >
            <FavBtn />
            <FavoriteIcon />
         </BtnWrapper>
         <BtnWrapper 
            color='var(--orange-color)'
            onClick={onDown}
         >
            <DownBtn />
            <IconNegative/>
         </BtnWrapper>
      </Wrapper>
   )
}

export {VoteBox};


