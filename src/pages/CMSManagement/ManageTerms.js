import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'antd';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';

import { postCmsList, patchCms, initialCms } from '../../actions/CmsAction';

import 'react-quill/dist/quill.snow.css';


const ManageTerms = () => {

  const dispatch = useDispatch();

  const key = { cms_key: "TC" }
  const [termsAndCondition, setTermsAndCondition] = useState("");
  const [termsId, setTermId] = useState();



  useEffect(() => {
    dispatch(postCmsList(key))
      .then((response) => {
        setTermsAndCondition(response?.data[0]?.cms_text);
        setTermId(response?.data[0]?.id);
      })
  }, [])

  const handleSubmit = (termsAndCondition) => {
    const data = {
      cms_key: "TC",
      cms_text: termsAndCondition,
    };
    {
      termsId ?
        dispatch(patchCms(termsId, data))
          .then((response) => {
            toast.success(response?.message)
            postCmsList(key)
          }).catch((error) => toast.error(error?.message))
        :
        dispatch(initialCms(data))
          .then((response) => {
            toast.success(response?.message)
            postCmsList(key)
          }).catch((error) => toast.error(error?.message));
    }
  }

  const handleChange = (value) => {
    value.replace(/<(.|\n)*?>/g, '').trim()
    setTermsAndCondition(value)
  }

  return (
    <>
      <div className='shadow-paper auto-height'>
        <ReactQuill theme="snow" value={termsAndCondition} onChange={handleChange} />
        <br />
        <Button type="primary" htmlType="submit" onClick={() => handleSubmit(termsAndCondition)}> Submit</Button>
      </div>
    </>
  );
};

export default ManageTerms;