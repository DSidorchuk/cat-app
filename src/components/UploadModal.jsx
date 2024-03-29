import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import bg from '../assets/uploadBg.svg';
import bgDark from '../assets/uploadBg-dark.svg';
import {ReactComponent as Reject} from '../assets/reject.svg';
import {ReactComponent as Confirmed} from '../assets/confirmed.svg'
import {ReactComponent as Cross} from "../assets/close.svg";
import { Spinner } from '../components/Spinner';
import { uploadPhoto, selectUpload, clearUpload } from "../features/upload/upload-slice";

const Wrapper = styled.div`
   position: fixed;
   left: 0;
   top: 0;
   z-index: 5;
   display: ${({show}) => show ? 'grid' : 'none'};
   grid-template-columns: 0.97fr 1fr;
   width: 100vw;
   height: 100vh;
   background-color: rgba(29, 29, 29, 0.60);

   @media(max-width: 991px) {
      grid-template-columns: 1fr;
      justify-items: center;
      align-items: center;
   }
`;

const Content = styled.div`
   position: relative;
   grid-column: 2;
   width: 680px;
   height: 840px;
   margin-top: 30px;
   padding: 0 20px;
   border-radius: var(--rad-lg);
   background-color: ${({theme}) => theme === 'light' ? 'var(--bg-light)' : 'var(--black-color-light)'};
   opacity: 1;

   @media(max-width: 991px) {
      grid-column: 1;
   }
   @media(max-width: 576px) {
      width: 375px;
      margin-top: 0;
      border-radius: unset;
      background-color: var(--bg-dark);
   }
`;

const Title = styled.h2`
   margin-top: 100px;
   text-align: center;
   font-size: var(--fs-xl);
   font-weight: var(--fw-bold);
   color: var(--text-color-dark);

   @media(max-width: 576px) {
      font-size: var(--fs-lg);
   }
`;

const SubTitle = styled.h3`
   margin-top: 10px;
   text-align: center;
   font-size: var(--fs-lg);
   font-weight: var(--fw-light);
   color: var(--grey-color);

   & > a {
      font-size: var(--fs-lg);
      font-weight: var(--fw-light);
      text-decoration: none;
      color: var(--pink-color);
   }
`;

const InputWindow = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 640px;
   height: 320px;
   margin: 0 auto;
   border: 2px dashed ${({theme}) => theme === 'light' ? 'var(--pink-color-light)' : 'var(--pink-color)'};
   border-radius: var(--rad-lg);
   background: url(${({theme}) => theme === 'light' ? bg : bgDark}) center center no-repeat var(--bg-light);
   background-color: ${({condition}) => condition === 'rejected' ? 'var(--pink-color-light)' : null};

   & > img {
      width: 558px;
      height: 280px;
      object-fit: contain;
   }

   @media(max-width: 576px) {
      width: 335px;
      height: 168px;
      background: url(${({theme}) => theme === 'light' ? bg : bgDark}) center center / 80px 80px no-repeat var(--bg-light);

      & > img {
         width: 295px;
         height: 148px;
         object-fit: contain;
      }
   }
`;

const Label = styled.label`
   display: block;
   font-size: var(--fs-lg);
   font-weight: var(--fw-light);
   color: var(--grey-color);

   & > span {
      font-size: var(--fs-lg);
      font-weight: var(--fw-bold);
      cursor: pointer;
      color: var(--text-color-dark);
   }

   @media(max-width: 576px) {
      width: 200px;
      height: 60px;
   }
`;

const FileName = styled.div`
   margin-top: 20px;
   text-align: center;
   font-size: var(--fs-lg);
   font-weight: var(--fw-light);
   color: var(--grey-color);
`;

const UploadBtn = styled.button`
   display: block;
   width: 172px;
   height: 40px;
   margin: 0 auto;
   margin-top: 20px;
   text-align: center;
   font-size: var(--fs-sm);
   font-weight: var(--fw-bold);
   letter-spacing: 2px;
   cursor: pointer;
   background-color: var(--pink-color);
   border: none;
   border-radius: var(--rad-sm);
   color: var(--white-color);
`;

const InfoTab = styled.div`
   display: flex;
   justify-content: flex-start;
   align-items: center;
   width: 640px;
   height: 60px;
   margin-top: 20px;
   font-size: var(--fs-md);
   font-weight: var(--fw-light);
   border-radius: var(--rad-sm);
   background: var(--bg-light);
   color: var(--grey-color);

   & > svg {
      margin: 0 10px 0 20px;
   }
   @media(max-width: 576px) {
      width: 335px;
      height: 60px;
   }
`;

const Close = styled.button`
   position: absolute;
   right: 32px;
   top: 32px;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 40px;
   height: 40px;
   border: none;
   border-radius: var(--rad-sm);
   cursor: pointer;
   padding: 0;
   background-color: var(--bg-light);
`;


const UploadModal = ({show, handleClose, theme}) => {
   const dispatch = useDispatch();
   const {status} = useSelector(selectUpload);
   const [img, setImg] = useState();

   useEffect(() => {
      return () => {
         dispatch(clearUpload());
      }
   }, [])

   const handleFile = (inputFile) => {
      dispatch(clearUpload());
      const image = Object.assign(inputFile, {
         preview: URL.createObjectURL(inputFile)
      });
      setImg(image);
   }

   const handleDrop = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if(file.type === "image/png" || file.type === "image/jpeg") {
         handleFile(file);
      }
   }

   const handleChange = (e) => {
      e.preventDefault();
      if(e.target.files){
         handleFile(e.target.files[0]);
      }
   }

   const handleDragOver = (event) => {
      event.preventDefault()
    }
  
   const handleDragStart = (event) => {
         event.dataTransfer.setData("text/plain", event.target.id)
   }

   const handleUploadPhoto = () => {
      dispatch(uploadPhoto(img));
   }

   return (
      <Wrapper show={show}>
         <Content theme={theme}>
            <Close onClick={handleClose}>
               <Cross/>
            </Close>
            <Title>Upload a .jpg or .png Cat Image</Title>
            <SubTitle>Any uploads must comply with the 
               <a href="https://thecatapi.com/privacy"> upload guidelines</a> or face deletion.
            </SubTitle>
            <InputWindow 
               draggable="true"
               onDrop={handleDrop} 
               onDragOver={handleDragOver}
               onDragStart={handleDragStart}
               condition={status}
               theme={theme}
            >
               {(img && status!=='fulfilled') && 
                  <img src={img.preview} alt={img.name}/>
               }
               {(!img || status==='fulfilled') && <>
                  <input 
                     type="file" 
                     id="image" 
                     name='image' 
                     accept="image/png, image/jpeg"
                     hidden
                     onChange={handleChange}
                  />
                  <Label htmlFor="image" >
                     <span>Drag here </span>
                     your file or 
                     <span> Click here </span>
                     to upload
                  </Label>
               </>} 
            </InputWindow>
            <FileName>
               {img && status!=='fulfilled' && `Image File Name: ${img.name}`}
               {(!img || status==='fulfilled') && 'No file selected'}
            </FileName>
            {img && status==='idle' &&
               <UploadBtn 
                  onClick={handleUploadPhoto}
                  disabled={status=== 'loading'}
               >
                     UPLOAD PHOTO
               </UploadBtn>}
            {status === 'loading' && <Spinner/>}
            {status === 'rejected' && 
               <InfoTab>
                  <Reject/> No Cat found - try a different one
               </InfoTab>
            }
            {status === 'fulfilled' && 
               <InfoTab>
                  <Confirmed/> Thanks for the Upload - Cat found!
               </InfoTab>
            }
         </Content>
      </Wrapper>
   )
}

export {UploadModal};