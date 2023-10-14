import { styled } from "styled-components";

import { Navigation } from "./Navigation";
import {ReactComponent as Cross} from "../assets/cross-tab.svg";

const Wrapper = styled.div`
   position: fixed;
   left: 0;
   top: 0;
   z-index: 10;
   display: ${({show}) => show ? 'flex' : 'none'};
   justify-content: center;
   width: 100vw;
   height: 100%;
   padding-top: 90px;
   background-color: var(--bg-dark);

`;

const CrossBtn = styled.button`
   position: absolute;
   top: 30px;
   right: 30px;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 60px;
   height: 60px;
   margin: 0;
   padding: 0;
   border: none;
   border-radius: var(--rad-lg);
   background-color: var(--bg-light);
`;


const MenuTablet = ({show, closeMenu}) => {
   return (
      <Wrapper show={show}>
         <CrossBtn onClick={closeMenu}>
            <Cross/>
         </CrossBtn>
         <Navigation closeMenu={closeMenu}/>
      </Wrapper>
   )
}

export {MenuTablet};