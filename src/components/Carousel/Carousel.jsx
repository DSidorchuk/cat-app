import { styled } from "styled-components";

import { Photo } from '../Photo';
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";

const DotsBox = styled.div`
   position: absolute;
   bottom: 15px;
   left: 50%;
   transform: translateX(-50%);
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 90px;
   height: 30px;
   padding: 0 12px;
   border-radius: var(--rad-lg);
   background-color: ${({theme}) => theme === 'light' ? 'var(--bg-light)' : 'var(--black-color-light)'};

   @media(max-width: 576px) {
      bottom: 2px;
   }
`;

const Carousel = ({photos, theme}) => {
   const settings = {
      dots: true,
      speed: 500,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      appendDots: (dots) => (<DotsBox theme={theme}>{dots}</DotsBox>),
   }

   return (
      <Slider {...settings}>
         {photos.map((item) => {
            return (
               <Photo 
                  key={item.id} 
                  src={item.url} 
                  alt={item.id}
               />
            )
         })}
      </Slider>
   )
}

export { Carousel };
