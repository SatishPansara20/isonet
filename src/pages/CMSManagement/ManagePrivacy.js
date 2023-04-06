import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'antd';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';

import { initialCms, patchCms, postCmsList } from '../../actions/CmsAction';

import 'react-quill/dist/quill.snow.css';


const ManagePrivacyPolicy = () => {

  const dispatch = useDispatch();

  const key = { cms_key: "PP" }
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [privacyId, setPrivacyId] = useState();



  useEffect(() => {
    dispatch(postCmsList(key))
      .then((response) => {
        setPrivacyPolicy(response?.data[0]?.cms_text);
        setPrivacyId(response?.data[0]?.id);
      })
  }, [])


  const handleSubmit = (privacyPolicy) => {
    const data = {
      cms_key: "PP",
      cms_text: privacyPolicy,
    }
    {
      privacyId ?
        dispatch(patchCms(privacyId, data))
          .then((response) => {
            toast.success(response?.message)
            postCmsList(key)
          }).catch((error) => toast.error(error?.message))
        :
        dispatch(initialCms(data))
          .then((response) => {
            toast.success(response?.message)
            postCmsList(key)
          }).catch((error) => toast.error(error?.message))
    }
  }

  const handleChange = (value) => {
    setPrivacyPolicy(value)
  }

  return (
    <>
      <div className='shadow-paper auto-height'>
        <ReactQuill theme="snow" value={privacyPolicy} onChange={handleChange} />
        <br />
        <Button type="primary" htmlType="submit" onClick={() => handleSubmit(privacyPolicy)}> Submit</Button>
      </div>
    </>
  );
};

export default ManagePrivacyPolicy;