import { styled } from "styled-components";
import { Outlet } from "react-router-dom";
import MediaQuery from "react-responsive";
import { useState } from "react";

import { Toolbar } from "./Toolbar";
import { MenuTablet } from "./MenuTablet";



const Wrapper = styled.div`
   width: 680px;
   display: grid;
   grid-template-rows: 60px min-content;
   row-gap: 10px;
   position: relative;

   @media(max-width: 991px) {
      width: 708px;
   }
`;

const Grid = styled.div`
   padding: 0 20px 20px 20px;
   width: 680px;
   display: grid;
   grid-template-rows: 80px minmax(690px, min-content);
   background-color: var(--bg-light);
   border-radius: var(--rad-lg);
   justify-content: center;

   @media(max-width: 991px) {
      width: 708px;
      // padding: 0;
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