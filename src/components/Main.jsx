import { styled } from "styled-components";
import { Navigation } from "./Navigation";

const Wrapper = styled.div`
   position: fixed;
   top: 134px;
   width: 446px;
   height: 450px;

   @media(max-width: 991px) {
      position: static;
      margin-top: 80px;
   }
   @media(max-width: 576px) {
      width: 335px;
   }
`;

const MainTitle = styled.h1`
   font-size: var(--fs-xxl);
   font-weight: var(--fw-bold);
   line-height: 0;
   color: var(--text-color-dark);
`

const Subtitle = styled.h2`
   margin-top: 10px;
   font-size: var(--fs-lg);
   font-weight: var(--fw-light);
   color: var(--grey-color);
`;

const Title = styled.h3`
   margin-top: 60px;
   font-size: var(--fs-lg);
   font-weight: var(--fw-bold);
   color: var(--text-color-dark);
`;

const Main = ({theme}) => {
   return (
      <Wrapper>
         <MainTitle>Hi!👋</MainTitle>
         <Subtitle>Welcome to MacPaw Bootcamp 2023</Subtitle>
         <Title>Lets start using The Cat API</Title>
         <Navigation theme={theme}/>
      </Wrapper>
   )
}

export { Main };