import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Avatar, Button, Col, Dropdown, Layout, Menu, Row, Space, } from 'antd'
import { CompanyIcon, ProfileDown, CmsIcon, UserIcon, AppIcon, ManageIcon, Dashboard, ArticleIcon, ForumsIcon, BlockedUser, CategoryIcon, LoanIcon, ReviewsIcon, SubScription, PostAdd, NotificationsIcon, Dollor, Industry, Tag, Rates, TermLength } from '../../svg'
import { UserAddOutlined, RollbackOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";

import { toAbsoluteUrl } from '../../utils'
import { doLogout } from '../../actions/auth';

import 'simplebar';
import './Layout.scss'

const PageLayout = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();


	const location = useLocation();
	const [title, setTitle] = useState();
	const localekey = localStorage.getItem('menukey')
	const [menukey, setMenuKey] = useState(localekey);
	const [collapsed, setCollapsed] = useState(false);

	const profile_img = JSON.parse(localStorage.getItem("profile_img"));

	useEffect(() => {
		if (localekey) {
			setMenuKey(localekey);
		} else {
			setMenuKey('1');
			localStorage.setItem('menukey', '1')
		}
	}, [localekey])


	useEffect(() => {
		const title1 = location.pathname.split("/").filter((item) => item).pop()
		setTitle(title1);
	}, [location.pathname])


	const logout = () => {
		dispatch(doLogout())
			.then((res) => {
				toast.success(res?.message);
				navigate("/login");
			}).catch((err) => (toast.error(err.response.data.message)));
	}

	const changePassword = () => {
		navigate("/change-password")
		handleMenuKey('1')
	}

	const handleMenuKey = (key) => {
		setMenuKey(key);
		localStorage.setItem('menukey', key)
	}


	const menuUserIsoNet = (
		<Menu
			items={[
				{
					key: '1',
					label: (
						<Button onClick={changePassword} className="drop-btn">
							Change password
						</Button>
					),
					icon: <UserAddOutlined />,
				},
				{
					key: '2',
					label: (
						<Button onClick={logout} className="drop-btn">
							<RollbackOutlined />
							Logout
						</Button>
					),
				},
			]}
		/>
	);


	const getItem = (label, key, icon, children) => {
		return {
			key,
			icon,
			children,
			label,
		};
	}


	const items = [
		getItem('Dashboard', '1', <Link to="/dashboard" onClick={() => handleMenuKey('1')}><Dashboard /></Link>),

		getItem('Funder Management', '2', <Link to="/funder-management" onClick={() => handleMenuKey('2')}><UserIcon /></Link>),

		getItem('Broker Management', '3', <Link to="/broker-management" onClick={() => handleMenuKey('3')}><UserIcon /></Link>),

		getItem('User Management', 'sub1', <UserIcon />, [
			getItem('Flagged User', '30', <Link to="/flagged-users-management" onClick={() => handleMenuKey('30')}><UserIcon /></Link>),
			getItem('Reported User', '31', <Link to="/reported-users-management" onClick={() => handleMenuKey('31')}><UserIcon /></Link>),
		]),

		getItem('Blocked Management', 'sub7', <BlockedUser />, [
			getItem('Blocked Funders', '5', <Link to="/blocked-management/blocked-funders" onClick={() => handleMenuKey('5')}><BlockedUser /></Link>),
			getItem('Blocked Brokers', '4', <Link to="/blocked-management/blocked-brokers" onClick={() => handleMenuKey('4')}><BlockedUser /></Link>),
		]),

		getItem('Subscription Management', '6', <Link to="/subscription-management" onClick={() => handleMenuKey('6')}><SubScription /></Link>),

		getItem('Company Management', '7', <Link to="/company-management" onClick={() => handleMenuKey('7')}><CompanyIcon /></Link>),

		getItem('Post Management', 'sub2', <PostAdd />, [
			getItem('All Posts', '8', <Link to="/post-management/all-posts" onClick={() => handleMenuKey('8')}><PostAdd /></Link>),
			getItem('Funder Posts', '9', <Link to="/post-management/funder-posts" onClick={() => handleMenuKey('9')}><PostAdd /></Link>),
			getItem('Broker Posts', '10', <Link to="/post-management/broker-posts" onClick={() => handleMenuKey('10')}><PostAdd /></Link>),
			getItem('Reported Posts', '11', <Link to="/post-management/reported-posts" onClick={() => handleMenuKey('11')}><PostAdd /></Link>),
			getItem('Flagged Posts', '32', <Link to="/post-management/flagged-posts" onClick={() => handleMenuKey('32')}><PostAdd /></Link>),
		]),

		getItem('Forums Management', 'sub3', <ForumsIcon />, [
			getItem('All Forums', '12', <Link to="/forums-management/all-forums" onClick={() => handleMenuKey('12')}><ForumsIcon /></Link>),
			getItem('Reported Forums', '13', <Link to="/forums-management/reported-forums" onClick={() => handleMenuKey('13')}><ForumsIcon /></Link>),
			getItem('Flagged Forums', '33', <Link to="/forums-management/flagged-forums" onClick={() => handleMenuKey('33')}><ForumsIcon /></Link>),
		]),

		getItem('Article Management', 'sub4', <ArticleIcon />, [
			getItem('All Articles', '14', <Link to="/articles-management/all-articles" onClick={() => handleMenuKey('14')}><ArticleIcon /></Link>),
			getItem('Reported Articles', '15', <Link to="/articles-management/reported-articles" onClick={() => handleMenuKey('15')}><ArticleIcon /></Link>),
		]),

		getItem('Loan Management', '16', <Link to="/loan-management" onClick={() => handleMenuKey('16')}><LoanIcon /></Link>),

		// getItem('Interests Management', '17', <Link to="/interests-management" onClick={() => handleMenuKey('17')}><InterestsIcon /></Link>),

		getItem('Category Management', '18', <Link to="/category-management" onClick={() => handleMenuKey('18')}><CategoryIcon /></Link>),

		getItem('Review Management  ', '19', <Link to="/review-management" onClick={() => handleMenuKey('19')}><ReviewsIcon /></Link>),

		getItem('Notification Management', '20', <Link to="/notification-management" onClick={() => handleMenuKey('20')}><NotificationsIcon /></Link>),

		getItem('App Data Management', 'sub5', <AppIcon />, [
			getItem('Manage Amounts', '21', <Link to="/app-data-management/amount" onClick={() => handleMenuKey('21')}><Dollor /></Link>),
			getItem('Manage Industries', '22', <Link to="/app-data-management/industries" onClick={() => handleMenuKey('22')}><Industry /></Link>),
			getItem('Manage Buy Rates', '23', <Link to="/app-data-management/buy-rates" onClick={() => handleMenuKey('23')}><Rates /></Link>),
			getItem('Manage States', '24', <Link to="/app-data-management/states" onClick={() => handleMenuKey('24')}><ManageIcon /></Link>),
			getItem('Manage Loan Tags', '25', <Link to="/app-data-management/loan-tags" onClick={() => handleMenuKey('25')}><Tag /></Link>),
			getItem('Manage Term Length', '26', <Link to="/app-data-management/term-length" onClick={() => handleMenuKey('26')}><TermLength /></Link>),
			getItem('Manage Upsell Points', '27', <Link to="/app-data-management/upsell-points" onClick={() => handleMenuKey('27')}><ManageIcon /></Link>),
		]),

		getItem('CMS Management', 'sub6', <CmsIcon />, [
			getItem('Manage Privacy Policy', '28', <Link to="/cms-management/privacy-policy" onClick={() => handleMenuKey('28')}><CmsIcon /></Link>),
			getItem('Manage Terms Condition', '29', <Link to="/cms-management/terms-and-conditions" onClick={() => handleMenuKey('29')}><CmsIcon /></Link>),
		]),
	];



	const { Header, Content, Sider } = Layout;

	return (
		<Layout >
			<Sider
				collapsible
				width="290"
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
				breakpoint="md"
			>
				<figure className='layout-logo'>
					<img className='logo' src={toAbsoluteUrl('/images/logo.svg')} alt="logo" />
					<img className='logo-icon' src={toAbsoluteUrl('/images/logo-icon.svg')} alt="logo" />
				</figure>
				<div data-simplebar className='scroll'>
					<Menu defaultSelectedKeys={[menukey]} mode="inline" items={items} />
				</div>
			</Sider>

			<Layout className="site-layout">
				<Header className='breadcrumb-header'>
					<Row gutter={16}>
						<Col className="gutter-row d-flex-center-start" sm={24} md={8}>
							<h2 className='header-title'>{title?.charAt(0)?.toUpperCase() + title?.slice(1)?.replace(/-/g, ' ')}</h2>
						</Col>
						<Col className="gutter-row d-flex-center-end sm-justify-content-between" sm={24} md={16}>
							<Dropdown overlay={menuUserIsoNet} trigger={['click']} overlayClassName="layout-header-dropdown">
								<Link to='' onClick={(e) => e.preventDefault()}>
									<Space>
										<Avatar
											size="large"
											src={profile_img}
											className='profile-avtar'
										/>
										<ProfileDown />
									</Space>
								</Link>
							</Dropdown>
						</Col>
					</Row>
				</Header>
				<Content>
					<div className="content-body">
						<div className="content-wrap" ref={props.setContainer}>
							<Outlet />
						</div>
					</div>
				</Content>
			</Layout>
		</Layout >
	);
};

export default PageLayout;