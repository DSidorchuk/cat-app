import { styled } from "styled-components";

const Wrapper = styled.div`
   width: 60px;
   height: 60px;
   padding: 20px 0;
   border-radius: var(--rad-lg);
   background-color: var(--bg-light);
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   align-items: center;
`;

const Line = styled.div`
   width: 30px;
   height: 2px;
   background-color: var(--pink-color);
`;

const Burger = ({handleClick}) => {
   return (
      <Wrapper onClick={handleClick}>
         <Line/>
         <Line/>
         <Line/>
      </Wrapper>
   )
}

export {Burger};