import React from 'react';
import { toAbsoluteUrl } from "../utils";
import { Input } from 'antd';
import './Upload.scss'


export const UploadFile = ({ setFileUpload, uploadText, imageUrl, setImageUrl, uploadWidth, uploadHeight, accept }) => {

    const handleChange = (e) => {
        setFileUpload(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => { setImageUrl(reader.result) });
        reader.readAsDataURL(e.target.files[0]);
    }

    return (
        <>
            <div className='upload-wrapper'>
                <div className='upload-ui' style={{ width: uploadWidth, height: uploadHeight }}>
                    {imageUrl && imageUrl.length ?
                        <img className='img' src={imageUrl} alt="not found" />
                        :
                        <span className='upload-span'><img src={toAbsoluteUrl('/images/upload-icon.svg')} alt="not found" /><br />{uploadText}</span>
                    }
                    <Input type='file' name="file" accept={accept} onChange={(e) => handleChange(e)} value="" title="" />
                </div>
            </div>
        </>
    );
}