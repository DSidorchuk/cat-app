import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import bg from '../assets/uploadBg.svg';
import {ReactComponent as Reject} from '../assets/reject.svg';
import {ReactComponent as Confirmed} from '../assets/confirmed.svg'
import {ReactComponent as Cross} from "../assets/close.svg";
import { Spinner } from '../components/Spinner';
import { uploadPhoto, selectUpload, clearUpload } from "../features/upload/upload-slice";

const Wrapper = styled.div`
   width: 100vmax;
   height: 100vmax;
   background-color: rgba(29, 29, 29, 0.60);
   position: fixed;
   left: 0;
   top: 0;
   z-index: 5;
   display: ${({show}) => show ? 'grid' : 'none'};
   grid-template-columns: repeat(2, 1fr);
`;

const Content = styled.div`
   margin-top: 30px;
   padding: 0 20px;
   width: 680px;
   height: 840px;
   border-radius: var(--rad-lg);
   background-color: var(--grey-color-light);
   grid-column: 2;
   position: relative;
`;

const Title = styled.h2`
   margin-top: 100px;
   text-align: center;
   color: var(--black-color);
   font-size: var(--fs-xl);
   font-weight: var(--fw-bold);
`;

const SubTitle = styled.h3`
   margin-top: 10px;
   text-align: center;
   color: var(--grey-color);
   font-size: var(--fs-lg);
   font-weight: var(--fw-light);

   & > a {
      color: var(--pink-color);
      font-size: var(--fs-lg);
      font-weight: var(--fw-light);
      text-decoration: none;
   }
`;

const InputWindow = styled.div`
   margin: 0 auto;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 640px;
   height: 320px;
   border: 2px dashed var(--pink-color-light);
   border-radius: var(--rad-lg);
   background: url(${bg}) center center no-repeat var(--white-color);
   background-color: ${({condition}) => condition === 'rejected' ? 'var(--pink-color-light)' : null};

   & > img {
      width: 558px;
      height: 280px;
      object-fit: contain;
   }
`;

const Label = styled.label`
   display: block;
   color: var(--grey-color);
   font-size: var(--fs-lg);
   font-weight: var(--fw-light);

   & > span {
      color: var(--black-color);
      font-size: var(--fs-lg);
      font-weight: var(--fw-bold);
      cursor: pointer;
   }
`;

const FileName = styled.div`
   margin-top: 20px;
   text-align: center;
   color: var(--grey-color);
   font-size: var(--fs-lg);
   font-weight: var(--fw-light);
`;

const UploadBtn = styled.button`
   display: block;
   margin: 0 auto;
   margin-top: 20px;
   width: 172px;
   height: 40px;
   background-color: var(--pink-color);
   border: none;
   border-radius: var(--rad-sm);
   color: var(--white-color);
   text-align: center;
   font-size: var(--fs-sm);
   font-weight: var(--fw-bold);
   letter-spacing: 2px;
   cursor: pointer;
`;

const InfoTab = styled.div`
   margin-top: 20px;
   width: 640px;
   height: 60px;
   border-radius: var(--rad-sm);
   background: var(--white-color);
   color: var(--grey-color);
   font-size: var(--fs-md);
   font-weight: var(--fw-light);
   display: flex;
   justify-content: flex-start;
   align-items: center;

   & > svg {
      margin: 0 10px 0 20px;
   }
`;

const Close = styled.button`
   position: absolute;
   right: 32px;
   top: 32px;
   border: none;
   cursor: pointer;
   padding: 0;
   background-color: var(--grey-color-light);
`;


const UploadModal = ({show, handleClose}) => {
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
         <Content>
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
               {!img || status==='fulfilled' && 'No file selected'}
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