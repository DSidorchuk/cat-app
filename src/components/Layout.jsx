import { styled } from "styled-components";
import { Outlet } from "react-router-dom";

import { ReactComponent as Logo} from '../assets/Logo.svg';
import { Main } from "./Main";
import { ThemeSwitcher } from "../features/theme/ThemeSwitcher";


const Container = styled.div`
   width: 1440px;
   margin: 0 auto;
`;

const Grid = styled.div`
   margin-top: 30px;
   display: grid;
   grid-template-columns: 665px 775px;
   justify-items: center;
`;

const FlexBox = styled.div`
   width: 665px;
   display: flex;
   justify-content: space-between;
`;

const Layout = () => {
   return (
      <Container>
         <Main/>
         <Grid>
            <FlexBox>
               <Logo/>
               <ThemeSwitcher/>
            </FlexBox>
            <Outlet/>
         </Grid>
      </Container>
   )
}

export { Layout };