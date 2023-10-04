import { styled } from "styled-components";
import { useParams } from "react-router-dom";

import { LinkBack } from "../components/LinkBack";
import { useBreedDetails } from "../features/breed-details/use-breeds-details";
import { NavSpan as Span } from "../components/NavSpan";
import { Carousel } from "../components/Carousel/Carousel";
import { Spinner } from "../components/Spinner";
import { FlexBox } from "../components/FlexBox";


const NavSpan = styled(Span)`
   background-color: var(--pink-color-light);
   color: var(--pink-color);
`;

const IdSpan = styled(Span)`
   width: 90px;
`;

const Grid = styled.div`
   display: grid;
   width: 100%;
   grid-template-rows: 390px min-content;
   row-gap: 20px;
`;

const Wrapper = styled.div`
   padding: 26px 40px 40px 40px;
   width: 640px;
   min-height: 204px;
   border-radius: 20px;
   border: 2px solid var(--pink-color-light);
   position: relative;
`;

const Title = styled.h2`
   margin: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   color: var(--black-color);
   font-size: var(--fs-xl);
   font-weight: var(--fw-bold);
   width: 270px;
   height: 62px;
   background-color: var(--white-color);
   position: absolute;
   top: 0;
   left: 50%;
   transform: translate(-50%, -50%);
`;

const Subtitle = styled.span`
   margin: 0 auto;
   color: var(--grey-color);
   font-size: var(--fs-md);
   font-weight: var(--fw-bold);
`;

const DataGrid = styled.div`
   margin-top: 20px;
   display: grid;
   grid-template-columns: repeat(2, 270px);
   column-gap: 20px;
`;

const DataBox = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: start;
`;

const DataName = styled.h5`
   margin: 0;
   color: var(--black-color);
   font-size: var(--fs-md);
   font-weight: var(--fw-bold);
`

const Data = styled.span`
   color: var(--grey-color);
   font-size: var(--fs-md);
   font-weight: var(--fw-light);
`;

const BreedData = () => {
   const {breedId} = useParams();
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
            <Carousel photos={photos}/>
            <Wrapper>
               <Title>{descr.name}</Title>
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

