import React from 'react';
import { useRef } from 'react';
import './fileuploader.scss';

const FileUploader = ({onFileSelected, isVisible}) => {
    const hiddenFileInput = useRef(null);

    const display = isVisible ? "block":"none";
    

  

    const handleClick = event => {
        hiddenFileInput.current.click();
      };

    const handleFileUpload = (event)=>{
        const fileUploaded = event.target.files[0];
        onFileSelected(fileUploaded)  
    }


    return (
      <>
        <button className='fileUploaderBtn' onClick={handleClick} style={{ display }}>
          Edit avatar
        </button>
         <input className='fileUploaderInput' type="file"
             ref={hiddenFileInput}
             onChange={handleFileUpload}
             style={{display:'none'}} 
      />
      </>
    );
  };
  export default FileUploader;