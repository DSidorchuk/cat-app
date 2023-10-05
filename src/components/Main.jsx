import { styled } from "styled-components";
import { Navigation } from "./Navigation";

const Wrapper = styled.div`
   width: 446px;
   height: 450px;
   position: fixed;
   top: 134px;
`;

const MainTitle = styled.h1`
   color: var(--text-color-dark);
   font-size: var(--fs-xxl);
   font-weight: var(--fw-bold);
   line-height: 0;
`

const Subtitle = styled.h2`
   margin-top: 10px;
   color: var(--grey-color);
   font-size: var(--fs-lg);
   font-weight: var(--fw-light);
`;

const Title = styled.h3`
   margin-top: 60px;
   color: var(--text-color-dark);
   font-size: var(--fs-lg);
   font-weight: var(--fw-bold);
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