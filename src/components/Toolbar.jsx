import { styled } from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import MediaQuery from "react-responsive";

import { Burger } from "./Burger";
import {ReactComponent as IconSearch} from "../assets/search-20.svg";
import {ReactComponent as IconPositive} from "../assets/positive.svg";
import {ReactComponent as IconHeart}from "../assets/heart.svg";
import {ReactComponent as IconNegative}  from "../assets/negative.svg";


const FlexBox = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 680px;

   @media(max-width: 991px) {
      width: 708px;
   }

   @media(max-width: 576px) {
      display: grid;
      grid-template-columns: repeat(5, 59px);
      grid-template-rows: repeat(2, 60px);
      gap: 10px;
      width: 335px;
      height: 130px;
   }
`;

const Form = styled.form`
   position: relative;

   @media(max-width: 576px) {
      grid-row: 2;
      grid-column: 1 / 6;
   }
`;

const Input = styled.input`
   width: 470px;
   height: 60px;
   padding: 0;
   padding-left: 20px;
   font-size: var(--fs-lg);
   font-weight: var(--fw-ligh);
   background-color: var(--bg-light);
   border: none;
   border-radius: var(--rad-lg);
   color: var(--grey-color);
   outline: none;

   &:focus {
      border: 2px solid var(--pink-color);
      color: var(--text-color-dark);
   }
   &:hover {
      border: 2px solid var(--pink-color-light);
   }

   @media(max-width: 991px) {
      width: 428px;
   }

   @media(max-width: 576px) {
      width: 335px;
   }
`;

const Submit = styled.button`
   position: absolute;
   top: 10px;
   right: 10px;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 40px;
   height: 40px;
   padding: 0;
   background-color: var(--bg-color);
   border-radius: var(--rad-sm);
   border: none;
   cursor: pointer;

   &:hover {
      background-color: var(--pink-color);

      & > svg {
         fill: var(--white-color);
      }
   }
`;

const Icon = styled(NavLink)`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 60px;
   height: 60px;
   padding: 0;
   background-color: var(--bg-light);
   border-radius: var(--rad-lg);
   border: none;
   cursor: pointer;

   &:hover {
      background-color: var(--pink-color-light);
   }
   &.active {
      background-color: var(--pink-color);

      & > svg {
         fill: var(--white-color);
      }
   }

`;


const Toolbar = ({openMenu}) => {
   const navigate = useNavigate();
   const [searchValue, setSearchValue] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();
      navigate(`/content/search/${searchValue}`)
   }

   const handleChange = (e) => {
      setSearchValue(e.target.value)
   }

   return (
      <FlexBox>
         <MediaQuery maxWidth={991}>
            <Burger handleClick={openMenu}/>
         </MediaQuery>
         <Form onSubmit={handleSubmit}>
            <Input 
               id="name" 
               type="text" 
               name="name"
               placeholder="Search for breeds by name"
               value={searchValue}
               onChange={handleChange}
               required
            />
            <Submit type="submit">
               <IconSearch/>
            </Submit>
         </Form>
            <MediaQuery maxWidth={576}>
               <div/>
            </MediaQuery>
            <Icon to={'/content/likes'}>
               <IconPositive/>
            </Icon>
            <Icon to={'/content/favourites'}>
               <IconHeart/>
            </Icon>
            <Icon to={'/content/dislikes'}>
               <IconNegative/>
            </Icon>
      </FlexBox>
   )
}

export { Toolbar };
