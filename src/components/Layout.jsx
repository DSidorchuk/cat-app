import { styled } from "styled-components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import MediaQuery from "react-responsive";

import { ReactComponent as Logo} from '../assets/Logo.svg';
import { ReactComponent as LogoDark} from '../assets/Logo-dark.svg';
import { Main } from "./Main";
import { ThemeSwitcher } from "../features/theme/ThemeSwitcher";


const Container = styled.div`
   width: 1440px;
   margin: 0 auto;

   @media(max-width: 991px) {
      width: 708px;
      margin-top: 30px;
   }
   @media(max-width: 576px) {
      width: 375px;
   }
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
   const theme = useSelector((state) => state.theme)
   return (
      <>
         <MediaQuery minWidth={992}>
            <Container>
               <Main theme={theme}/>
               <Grid>
                  <FlexBox>
                     {theme === 'light' ? <Logo/> : <LogoDark/>}
                     <ThemeSwitcher/>
                  </FlexBox>
                  <Outlet/>
               </Grid>
            </Container>
         </MediaQuery>

         <MediaQuery maxWidth={991}>
            <Container>
               <Outlet/>
            </Container>
         </MediaQuery>
      </>
   )
}

export { Layout };