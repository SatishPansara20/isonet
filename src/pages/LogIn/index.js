import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { toast } from "react-toastify"
import { Button, Form, Input } from 'antd'

import { RightIcon } from '../../svg'
import patterns from '../../utils/patterns'
import { doLogin } from '../../actions/auth'
import LoginHeader from '../../components/common/LoginHeader'

import './LogIn.scss'

const LogIn = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onFinish = (values) => {
		const data = {
			email: values.email,
			password: values.password
		}

		dispatch(doLogin(data))
			.then((response) => {
				if (response?.status === 200) {
					toast.success(response?.message);
					navigate("/dashboard");
				}
			})
			.catch(
				(error) =>
					toast.error(error?.message)
			);
	}

	return (
		<>
			<LoginHeader />
			<div className='login-wrap'>
				<div className='login-detail'>
					<div className='bg'>
						<h1 className='title'>Login</h1>
						<Form
							onFinish={onFinish}
							className='login-form'
						>
							<div className='row'>
								<div className='col-sm-12'>
									<Form.Item
										className='form-group'
										name="email"
										rules={[
											{ required: true, message: 'Please enter email ' },
											{ pattern: patterns.email, message: "Please enter valid email" }
										]}
									>
										<Input placeholder="Email" />
									</Form.Item>
								</div>
								<div className='col-sm-12'>
									<Form.Item
										className='form-group'
										name="password"
										rules={[
											{ required: true, message: "Please enter your password" },
											() => ({
												validator: (_, value) => {
													if (!value) {
														return Promise.reject();
													} else if (
														/^\S{3,}$/.test(value) &&
														/^.{6,50}$/.test(value)
													) {
														return Promise.resolve();
													} else {
														return Promise.reject(
															"Password must be 6-16 characters long and not contain white spaces"
														);
													}
												},
											}),
										]}
									>
										<Input.Password placeholder="Password" />
									</Form.Item>
								</div>
								<div className='col-sm-12'>
									<Form.Item className='form-group'>
										<Button type="primary" htmlType="submit"> Login<RightIcon /></Button>
										<Link to='/forgot-password' className='f-pwd'> Forgot password? </Link>
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

export default LogIn;