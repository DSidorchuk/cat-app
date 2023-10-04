import { styled } from "styled-components";

import bg from '../assets/girl-and-pet 1.png';

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

const Home = () => {
   return (
      <Wrapper>
         <Image src={bg} alt="girl with pet"/>
      </Wrapper>
   )
}

export { Home };