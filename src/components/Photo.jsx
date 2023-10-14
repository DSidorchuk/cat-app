import { styled } from "styled-components";

export const Photo = styled.img`
   display: block;
   width: 640px;
   height: 360px;
   object-fit: cover;
   border-radius: var(--rad-lg);

   @media(max-width: 991px) {
      width: 668px;
   }

   @media(max-width: 576px) {
      width: 295px;
      height: 167px;
   }
`;