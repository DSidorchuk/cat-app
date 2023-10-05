import { styled } from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";

import {ReactComponent as IconSearch} from "../assets/search-20.svg";
import {ReactComponent as IconPositive} from "../assets/positive.svg";
import {ReactComponent as IconHeart}from "../assets/heart.svg";
import {ReactComponent as IconNegative}  from "../assets/negative.svg";


const FlexBox = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 680px;
`;

const Form = styled.form`
   position: relative;
`;

const Input = styled.input`
   padding: 0;
   padding-left: 20px;
   width: 470px;
   height: 60px;
   background-color: var(--bg-light);
   border: none;
   border-radius: var(--rad-lg);
   font-size: var(--fs-lg);
   font-weight: var(--fw-ligh);
   color: var(--grey-color);
   outline: none;

   &:focus {
      border: 2px solid var(--pink-color);
      color: var(--text-color-dark);
   }
   &:hover {
      border: 2px solid var(--pink-color-light);
   }
`;

const Submit = styled.button`
   padding: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   position: absolute;
   top: 10px;
   right: 10px;
   width: 40px;
   height: 40px;
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
   padding: 0;
   width: 60px;
   height: 60px;
   background-color: var(--bg-light);
   border-radius: var(--rad-lg);
   border: none;
   cursor: pointer;
   display: flex;
   justify-content: center;
   align-items: center;

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

const Toolbar = () => {
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
