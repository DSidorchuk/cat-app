import { styled } from "styled-components";
import { Outlet } from "react-router-dom";
import MediaQuery from "react-responsive";
import { useState } from "react";

import { Toolbar } from "./Toolbar";
import { MenuTablet } from "./MenuTablet";



const Wrapper = styled.div`
   position: relative;
   display: grid;
   grid-template-rows: 60px min-content;
   row-gap: 10px;
   width: 680px;

   @media(max-width: 991px) {
      width: 708px;
   }

   @media(max-width: 576px) {
      grid-template-rows: 130px min-content;
      width: 375px;
      padding: 0 20px;
   }
`;

const Grid = styled.div`
   display: grid;
   grid-template-rows: 80px minmax(690px, min-content);
   justify-content: center;
   width: 680px;
   padding: 0 20px 20px 20px;
   background-color: var(--bg-light);
   border-radius: var(--rad-lg);
   
   @media(max-width: 991px) {
      width: 708px;
   }

   @media(max-width: 576px) {
      grid-template-rows: minmax(80px, min-content) minmax(690px, min-content);
      width: 335px;
      padding: 0 20px;
   }
`;


const Content = () => {
   const [active, setActive] = useState(false);

   const handleOpen = () => {
      setActive(true);
   }
   const handleClose = () => {
      setActive(false);
   }

   return (
      <Wrapper>
         <MediaQuery maxWidth={991}>
            <MenuTablet show={active} closeMenu={handleClose}/>
         </MediaQuery>
         <Toolbar openMenu={handleOpen}/>
         <Grid>
            <Outlet/>
         </Grid>
      </Wrapper>
   )
}

export { Content };