import React from 'react';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../utils';
import './loginheader.scss';


const LoginHeader = () => {
	return (
		<>
			<div className="loginheader">
				<Link to='/home'><img src={toAbsoluteUrl('/images/logo.svg')} alt="logo" /></Link>
			</div>
		</>
	);
}

export default LoginHeader;