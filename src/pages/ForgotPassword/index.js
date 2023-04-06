import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Button, Form, Input } from 'antd';

import { RightIcon } from '../../svg';
import { doLogin } from '../../actions/auth';
import LoginHeader from '../../components/common/LoginHeader';

import '../LogIn/LogIn.scss';


const ForgotPassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onForgotPassword = () => {
    dispatch(doLogin())
      .then((response) => {
        if (response.status === 200) {
          toast.success(response?.message)
          navigate('/forgot-password');
        }
      }).catch((error) => (error.response.message));
  }


  return (
    <>

      <LoginHeader />

      <div className='login-wrap'>
        <div className='login-detail'>
          <div className='bg'>
            <h1 className='title'>Forgot password?</h1>
            <Form className='login-form'>
              <div className='row'>
                <div className='col-sm-12'>
                  <Form.Item
                    className='form-group'
                    name="firstname"
                    rules={[
                      { type: 'email', message: 'Please enter valid email' },
                      { required: true, message: 'Please enter Email' },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </div>
                <div className='col-sm-12'>
                  <Form.Item className='form-group'>
                    <Button type="primary" htmlType="submit" onClick={onForgotPassword}>Submit<RightIcon /></Button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>

    </>
  );
}

export default ForgotPassword;