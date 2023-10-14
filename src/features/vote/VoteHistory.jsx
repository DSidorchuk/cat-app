import { styled } from "styled-components";
import MediaQuery from "react-responsive";

import {ReactComponent as Heart} from '../../assets/small-heart.svg';
import {ReactComponent as Like} from '../../assets/small-like.svg';
import {ReactComponent as Dislike} from '../../assets/small-dislike.svg';


const Grid = styled.div`
   position: relative;
   display: grid;
   grid-auto-rows: 60px;
   row-gap: 10px;
   width: 640px;

   @media(max-width: 991px) {
      width: 668px;
   }
   @media(max-width: 576px) {
      grid-auto-rows: 120px;
      width: 295px;
   }
`;

const RecordWrapper = styled.div`
   display: grid;
   grid-template-columns: 60px 525px;
   column-gap: 20px;
   align-items: center;
   width: 640px;
   height: 60px;
   padding: 0 20px 0 15px;
   background-color: ${({theme}) => theme === 'light' ? 'var(--bg-dark)' : 'var(--bg-light)'};
   border-radius: var(--rad-sm);

   @media(max-width: 991px) {
      width: 668px;
   }

   @media(max-width: 576px) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      width: 295px;
      height: 120px;
      padding: 18px 20px 15px 15px;
   }
`;

const RecordBox = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 525px;
   height: 60px;

   @media(max-width: 991px) {
      width: 553px;
   }
`;

const Time = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 60px;
   height: 30px;
   font-size: var(--fs-md);
   font-weight: var(--fw-light);
   background-color: ${({theme}) => theme==='light' ? 'var(--bg-light)' : 'var(--bg-dark)'};
   border-radius: var(--rad-xs);
   color: var(--text-color-dark);
`;

const Record = styled.p`
   font-size: var(--fs-md);
   font-weight: var(--fw-light);
   color: var(--grey-color);

   & > span {
      font-weight: var(--fw-bold);
      color: var(--text-color-dark);
   }

   @media(max-width: 576px) {
      order: 3;
      width: 265px;
      height: 40px;
      margin: 0;
   }
`;

const IconWrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   
   & > svg {
      width: 100%;
      height: 20px;
   }
`;

const VoteRecord = ({type, id, time, theme}) => {

   let descr;
   let Icon;

   switch(type) {
      case 'remove-fav': {
         descr = 'was removed from Favourites';
         Icon = null;
         break;
      }
      case 'add-fav': {
         descr = 'was added to Favourites';
         Icon = () => <Heart/>;
         break;
      }
      case 'like': {
         descr = 'was added to Likes';
         Icon = () => <Like/>;
         break;
      }
      case 'dislike': {
         descr = 'was added to Dislikes';
         Icon = () => <Dislike/>
         break;
      }
   }

   return (
      <>
         <MediaQuery minWidth={577}>
            <RecordWrapper theme={theme}>
               <Time theme={theme}>{time}</Time>
               <RecordBox>
                  <Record>Image ID: <span>{id}</span> {descr} </Record>
                  <IconWrapper>
                     {Icon && <Icon/>}
                  </IconWrapper>
               </RecordBox>
            </RecordWrapper>
         </MediaQuery>
         <MediaQuery maxWidth={576}>
            <RecordWrapper theme={theme}>
               <Time theme={theme}>{time}</Time>
               <Record>Image ID: <span>{id}</span> {descr} </Record>
               <IconWrapper>
                  {Icon && <Icon/>}
               </IconWrapper>
            </RecordWrapper>
         </MediaQuery>
      </>
   )
}

const VoteHistory = ({history, theme}) => {
   return (
      <Grid>
         {history.length > 0 && history.map((item) => {
            return (
               <VoteRecord 
                  key={item.id + item.time}
                  type={item.type}
                  id={item.id}
                  time={item.time}
                  theme={theme}
               />
            )
         })}
      </Grid>
   )
}

export {VoteHistory};