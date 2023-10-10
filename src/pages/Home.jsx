import { styled } from "styled-components";
import MediaQuery from "react-responsive";

import bg from '../assets/girl-and-pet 1.png';
import { ReactComponent as Logo} from '../assets/Logo.svg';
import { Main } from "../components/Main";

// Desktop
const Wrapper = styled.div`
   margin: 0 30px 30px 65px;
   width: 680px;
   height: 840px;
   background-color: var(--pink-color-light);
   border-radius: var(--rad-lg);
   position: relative;
`;

const Image = styled.img`
   position: absolute;
   left: -65px;
   top: -30px;
`;

// Tablet
const TabWrapper = styled.div`
   padding: 30px 0 0 117px;
`;

const Home = () => {
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
               <Main/>
            </TabWrapper>
         </MediaQuery>
      </>

   )
}

export { Home };