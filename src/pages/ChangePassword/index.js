import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from "react-toastify"
import { Button, Form, Input } from 'antd';

import { LeftIcon, RightIcon } from '../../svg';
import { changePassword } from '../../actions/auth';
import LoginHeader from '../../components/common/LoginHeader';

import '../LogIn/LogIn.scss';


const ChangePassword = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onFinish = (values) => {
		const data = { old_password: values.old_password, new_password: values.new_password, }
		dispatch(changePassword(data))
			.then((response) => {
				if (response?.status === 200) {
					toast.success(response?.message);
					navigate('/dashboard');
				}
			})
			.catch((err) => toast.error(err?.message));
	}

	return (
		<>
			<LoginHeader />
			<div className='login-wrap'>
				<div className='login-detail'>
					<div className='bg'>
						<h1 className='title'>Change password</h1>
						<Form className='login-form' onFinish={onFinish}>
							<div className='row'>
								<div className='col-sm-12'>
									<Form.Item
										className='form-group'
										name="old_password"
										rules={[{ required: true, message: 'Please enter old password' }]}
									>
										<Input.Password type={'password'} placeholder="Old password" autoComplete='off' />
									</Form.Item>
								</div>
								<div className='col-sm-12'>
									<Form.Item
										className='form-group'
										name="new_password"
										rules={[
											{ required: true, message: "Please enter new password" },
											() => ({
												validator: (_, value) => {
													if (!value) {
														return Promise.reject();
													} else if (
														/^\S{3,}$/.test(value) &&
														/^.{6,16}$/.test(value)
													) {
														return Promise.resolve();
													} else {
														return Promise.reject(
															"Password must be 6-16 characters long and not contain spaces"
														);
													}
												},
											}),
										]}
									>
										<Input.Password type={'password'} placeholder="New password" autoComplete='off' />
									</Form.Item>
								</div>
								<div className='col-sm-12'>
									<Form.Item
										className='form-group'
										name="confirm_password"
										rules={[
											{ required: true, message: "Please enter confirm password" },
											({ getFieldValue }) => ({
												validator(_, value) {
													if (!value || getFieldValue('new_password') === value) {
														return Promise.resolve();
													}
													return Promise.reject(new Error('Confirm password and new password must be same'));
												},
											}),
										]}
									>
										<Input.Password type={'password'} placeholder="Confirm password" autoComplete='off' />
									</Form.Item>
								</div>
								<div className='col-sm-12'>
									<Form.Item className='form-group'>
										<Button type="primary" htmlType="submit"> Submit<RightIcon /></Button>
										<Button type="primary back-btn" onClick={() => navigate('/dashboard')}><LeftIcon />Back</Button>
									</Form.Item>
								</div>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChangePassword;