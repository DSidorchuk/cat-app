import { styled } from "styled-components";
import MediaQuery from "react-responsive";
import { useSelector } from "react-redux";

import bg from '../assets/girl-and-pet 1.png';
import { ReactComponent as Logo} from '../assets/Logo.svg';
import { Main } from "../components/Main";

// Desktop
const Wrapper = styled.div`
   position: relative;
   width: 680px;
   height: 840px;
   margin: 0 30px 30px 65px;
   background-color: var(--pink-color-light);
   border-radius: var(--rad-lg);
`;

const Image = styled.img`
   position: absolute;
   left: -65px;
   top: -30px;
`;

// Tablet
const TabWrapper = styled.div`
   padding: 30px 0 0 117px;

   @media(max-width: 576px) {
      padding: 0 20px 20px;
   }
`;

const Home = () => {
   const theme = useSelector((state) => state.theme)
   
   return (
      <>
         <MediaQuery minWidth={992}>
            <Wrapper>
               <Image src={bg} alt="girl with pet"/>
            </Wrapper>
         </MediaQuery>
         <MediaQuery maxWidth={991}>
            <TabWrapper>
               <Logo/>
               <Main theme={theme}/>
            </TabWrapper>
         </MediaQuery>
      </>

   )
}

export { Home };