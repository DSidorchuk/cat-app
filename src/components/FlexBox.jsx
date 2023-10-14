import { styled } from "styled-components";

export const FlexBox = styled.div`
   display: flex;
   justify-content: flex-start;
   align-items: center;
   gap: 10px;
   width: 640px;
   
   @media(max-width: 991px) {
      width: 668px;
   }
   @media(max-width: 576px) {
      width: 335px;
      padding: 0 20px;
   }
`;
