import React from 'react';
import { useRef } from 'react';
import './fileuploader.scss';

const FileUploaderForBlog = ({onFileSelected}) => {
    const hiddenFileInput = useRef(null);

    const handleClick = event => {
      event.preventDefault();
        hiddenFileInput.current.click();
        console.log("this is getting clicked")
      };

    const handleFileUpload = (event)=>{
        const fileUploaded = event.target.files[0];
        onFileSelected(fileUploaded)  
    }


    return (
      <>
        <button className='fileUploaderBtn' onClick={handleClick}>
          Upload&#129331;
        </button>
         <input className='fileUploaderInput' type="file"
             ref={hiddenFileInput}
             onChange={handleFileUpload}
             style={{display:'none'}} 
      />
      </>
    );
  };
  export default FileUploaderForBlog;
