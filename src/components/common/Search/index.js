import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RenderSearchResponsive } from '../../../utils/FormField';
import './Search.scss';


const Search = () => {

	const navigate = useNavigate();
	
	return (
		<>
			<div className='patients-search'>
				<RenderSearchResponsive />
				<div className='btn-list'>
					{/* <Button type="default" htmlType="submit">Delete patientss</Button>
					<Button type="secondary" htmlType="submit"> Export list </Button> */}
					<Button type="primary" htmlType="submit" onClick={() => navigate('/funder-management/new-request')}> New Requests</Button>
				</div>
			</div>
		</>
	);
}

export default Search;