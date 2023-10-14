import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { LinkBack } from "../components/LinkBack";
import { useBreedDetails } from "../features/breed-details/use-breeds-details";
import { NavSpan as Span } from "../components/NavSpan";
import { Carousel } from "../components/Carousel/Carousel";
import { Spinner } from "../components/Spinner";
import { FlexBox } from "../components/FlexBox";


const NavSpan = styled(Span)`
   background-color: var(--bg-color);
   color: var(--pink-color);
`;

const IdSpan = styled(Span)`
   width: 90px;
`;

const Grid = styled.div`
   display: grid;
   grid-template-rows: 390px min-content;
   row-gap: 20px;
   width: 100%;

   @media(max-width: 576px) {
      grid-template-rows: 185px minmax(315px, min-content);
      row-gap: 50px;
      justify-content: center;
   }
`;

const Wrapper = styled.div`
   position: relative;
   width: 640px;
   min-height: 204px;
   padding: 26px 40px 40px 40px;
   border-radius: 20px;
   border: 2px solid ${({theme}) => theme === 'light' ? 'var(--pink-color-light)' : 'var(--pink-color)'};

   @media(max-width: 991px) {
      width: 668px;
   }

   @media(max-width: 576px) {
      width: 295px;
      padding: 26px 20px 20px;
   }
`;

const Title = styled.h2`
   position: absolute;
   top: 0;
   left: 50%;
   transform: translate(-50%, -50%);
   display: flex;
   justify-content: center;
   align-items: center;
   width: 360px;
   height: 62px;
   margin: 0;
   font-size: var(--fs-xl);
   font-weight: var(--fw-bold);
   color: var(--text-color-dark);
   background-color: ${({theme}) => theme === 'light' ? 'var(--bg-light)' : 'var(--black-color-light)'};
   
   @media(max-width: 991px) {
      font-size: var(--fs-lg);
   }

   @media(max-width: 576px) {
      width: 200px;
   }
`;

const Subtitle = styled.span`
   margin: 0 auto;
   font-size: var(--fs-md);
   font-weight: var(--fw-bold);
   color: var(--grey-color);
`;

const DataGrid = styled.div`
   display: grid;
   grid-template-columns: repeat(2, 282px);
   column-gap: 20px;
   margin-top: 20px;

   @media(max-width: 576px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, 70px);
      row-gap: 10px;
   }
`;

const DataBox = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: start;
`;

const DataName = styled.h5`
   margin: 0;
   font-size: var(--fs-md);
   font-weight: var(--fw-bold);
   color: var(--text-color-dark);
`

const Data = styled.span`
   font-size: var(--fs-md);
   font-weight: var(--fw-light);
   color: var(--grey-color);
`;

const BreedData = () => {
   const {breedId} = useParams();
   const theme = useSelector((state) => state.theme);
   const [descr, photos, status, error] = useBreedDetails(breedId);


   return (
      <>
         <FlexBox>
            <LinkBack/>
            <NavSpan>BREEDS</NavSpan>
            <IdSpan>{breedId}</IdSpan>
         </FlexBox>
         {status === 'loading' && <Spinner/>}
         {status === 'fulfilled' && !error && <Grid>
            <Carousel photos={photos} theme={theme}/>
            <Wrapper theme={theme}>
               <Title theme={theme}>{descr.name}</Title>
               <Subtitle>{descr.description}</Subtitle>
               <DataGrid>
                  <DataBox>
                     <DataName>Temperament: <br/>
                        <Data>{descr.temperament}</Data>
                     </DataName>
                  </DataBox>
                  <DataBox>
                     <DataName>Origin:  
                        <Data> {descr.origin}</Data>
                     </DataName>
                     <DataName>Weight:  
                        <Data> {descr.weight} kgs</Data>
                     </DataName>
                     <DataName>Life span:  
                        <Data> {descr.life} years</Data>
                     </DataName>
                  </DataBox>
               </DataGrid>
            </Wrapper>
         </Grid> }
      </>
   )
}

export { BreedData };

