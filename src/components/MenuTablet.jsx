import { styled } from "styled-components";

import { Navigation } from "./Navigation";
import {ReactComponent as Cross} from "../assets/cross-tab.svg";

const Wrapper = styled.div`
   padding-top: 90px;
   display: flex;
   justify-content: center;
   width: 100vw;
   height: 100%;
   position: absolute;
   left: ${({show}) => show ? '0' : '-200%'};
   top: 0;
   background-color: var(--bg-dark);
   z-index: 10;
`;

const CrossBtn = styled.button`
   margin: 0;
   padding: 0;
   border: none;
   width: 60px;
   height: 60px;
   border-radius: var(--rad-lg);
   background-color: var(--bg-light);
   position: absolute;
   top: 0;
   right: 30px;
   display: flex;
   justify-content: center;
   align-items: center;
`;


const MenuTablet = ({show, closeMenu}) => {
   return (
      <Wrapper show={show}>
         <CrossBtn onClick={closeMenu}>
            <Cross/>
         </CrossBtn>
         <Navigation/>
      </Wrapper>
   )
}

export {MenuTablet};