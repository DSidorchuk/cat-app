import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {ReactComponent as IconBack} from "../assets/arrow left 1.svg";


// export const NavLink = styled(Link)`
//    width: 40px;
//    height: 40px;
//    border-radius: var(--rad-sm);
//    background-color: var(--pink-color-light);
//    display: flex;
//    justify-content: center;
//    align-items: center;
//    cursor: pointer;

//    &:hover {
//       background-color: var(--pink-color);
//       & > svg {
//          fill: var(--white-color);
//       }
//    }
// `;

const Button = styled.button`
   padding: 0;
   width: 40px;
   height: 40px;
   border-radius: var(--rad-sm);
   background-color: var(--pink-color-light);
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

const LinkBack = ({to}) => {
   const navigate = useNavigate();
   
   return (
      // <NavLink to={to} onClick={() => navigate(-1)}>
      //    <IconBack/>
      // </NavLink>
      <Button onClick={() => navigate(-1)}>
         <IconBack/>
      </Button>
   )
}

export {LinkBack};