import { styled } from "styled-components";
import { Outlet } from "react-router-dom";

import { Toolbar } from "./Toolbar";

const Wrapper = styled.div`
   width: 680px;
   display: grid;
   grid-template-rows: 60px min-content;
   row-gap: 10px;
`;

const Grid = styled.div`
   padding: 0 20px 20px 20px;
   width: 680px;
   display: grid;
   grid-template-rows: 80px minmax(690px, min-content);
   background-color: var(--bg-light);
   border-radius: var(--rad-lg);
   justify-content: center;
`;

const Content = () => {
   return (
      <Wrapper>
         <Toolbar/>
         <Grid>
            <Outlet/>
         </Grid>
      </Wrapper>
   )
}

export { Content };