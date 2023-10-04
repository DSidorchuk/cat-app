import { styled } from "styled-components";

import { makeGrid } from "../utilities/makeGrid";

const Grid = styled.div`
   display: grid;
   grid-template-columns: repeat(3, 200px);
   grid-auto-rows: 140px;
   gap: 20px 20px;
   justify-content: center;
   grid-template-areas: ${(props) => props.size};
`;


const ImageGrid = ({size, children}) => {
   const grid = makeGrid(size);
   return (
      <Grid size={grid}>
         {children}
      </Grid>
   )

}

export {ImageGrid};