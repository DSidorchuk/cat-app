import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import {ReactComponent as IconBack} from "../assets/arrow left 1.svg";


const Button = styled.button`
   padding: 0;
   width: 40px;
   height: 40px;
   border-radius: var(--rad-sm);
   background-color: var(--bg-color);
   display: flex;
   justify-content: center;
   align-items: center;
   border: none;
   cursor: pointer;

   &:hover {
      background-color: var(--pink-color);
      & > svg {
         fill: var(--white-color);
      }
   }
`;

const LinkBack = () => {
   const navigate = useNavigate();
   
   return (
      <Button onClick={() => navigate(-1)}>
         <IconBack/>
      </Button>
   )
}

export {LinkBack};