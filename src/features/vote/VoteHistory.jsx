import { styled } from "styled-components";

import {ReactComponent as Heart} from '../../assets/small-heart.svg';
import {ReactComponent as Like} from '../../assets/small-like.svg';
import {ReactComponent as Dislike} from '../../assets/small-dislike.svg';


const Grid = styled.div`
   display: grid;
   grid-auto-rows: 60px;
   row-gap: 10px;
   width: 640px;
   position: relative;
`;

const RecordWrapper = styled.div`
   width: 640px;
   height: 60px;
   padding: 0 20px 0 15px;
   background-color: var(--grey-color-light);
   border-radius: var(--rad-sm);
   align-items: center;
   display: grid;
   grid-template-columns: 60px 525px;
   column-gap: 20px
`;

const RecordBox = styled.div`
   width: 525px;
   height: 60px;
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

const Time = styled.div`
   width: 60px;
   height: 30px;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: var(--white-color);
   border-radius: var(--rad-xs);
   color: var(--black-color);
   font-size: var(--fs-md);
   font-weight: var(--fw-light);
`;

const Record = styled.p`
   color: var(--grey-color);
   font-size: var(--fs-md);
   font-weight: var(--fw-light);

   & > span {
      color: var(--black-color);
      font-weight: var(--fw-bold);
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

const VoteRecord = ({type, id, time}) => {

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
      <RecordWrapper>
         <Time>{time}</Time>
         <RecordBox>
            <Record>Image ID: <span>{id}</span> {descr} </Record>
            <IconWrapper>
               {Icon && <Icon/>}
            </IconWrapper>
         </RecordBox>
      </RecordWrapper>
   )
}

const VoteHistory = ({history}) => {
   return (
      <Grid>
         {history.length > 0 && history.map((item) => {
            return (
               <VoteRecord 
                  key={item.id + item.time}
                  type={item.type}
                  id={item.id}
                  time={item.time}
               />
            )
         })}
      </Grid>
   )
}

export {VoteHistory};