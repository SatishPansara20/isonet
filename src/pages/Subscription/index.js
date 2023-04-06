import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import moment from 'moment';
import { Table } from 'antd'

import { PrefixSearch } from '../../svg';
import { toAbsoluteUrl } from '../../utils';
import { searchSubscribedUser } from '../../actions/dashboard';
import { getSubscriptionUserList } from '../../actions/UserAction';

import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';

function Subscription() {

    const dispatch = useDispatch();

    const [subscriptionData, setSubscriptionData] = useState([])


    useEffect(() => {
        subscribedUsersListing()
    }, [])


    // Listing
    const subscribedUsersListing = () => {
        dispatch(getSubscriptionUserList()).then(res => setSubscriptionData(res?.data))
    }

    // Searching
    const searchSubscriber = (value) => {
        const data = { query: value.trim(), }
        dispatch(searchSubscribedUser(data))
            .then(res => setSubscriptionData(res?.data))
            .catch(err => subscribedUsersListing())
    }

    // Table Columns
    const columns = [
        {
            title: 'Image',
            dataIndex: 'profile_img',
            key: 'profile_img',
            render: (row, record) => (
                <div className='image'>
                    <img src={record?.profile_img || toAbsoluteUrl('/images/user-img.svg')}
                        alt="Profile" title={record?.profile_img ? "" : "not found"} />
                </div>
            )
        },
        {
            title: 'User Name',
            dataIndex: 'first_name',
            key: 'first_name',
            sorter: (a, b) => a?.first_name?.localeCompare(b?.first_name),
            render: (row, record) => <div>
                <div>{record?.first_name} {record?.last_name}</div>
            </div>
        },
        {
            title: 'User Role',
            dataIndex: 'user_type',
            key: 'user_type',
            sorter: (a, b) => a?.user_type?.localeCompare(b?.user_type),
            render: (row, record) => <div>
                <div>{record?.user_type === "FU" ? "Funder" : "Broker"}</div>
            </div>
        },
        {
            title: 'Subscription Start Date',
            dataIndex: 'subscription_start_date',
            key: 'subscription_start_date',
            sorter: (a, b) => a?.subscription_start_date?.localeCompare(b?.subscription_start_date),
            render: (row, record) => <div>
                <div>
                    {record?.subscription_start_date ?
                        moment.utc(record?.subscription_start_date)?.format('MM-DD-YYYY') : <div align="middle">{"-"}</div>
                    }
                </div>
            </div>
        },
        {
            title: 'Subscription End Date',
            dataIndex: 'subscription_end_date',
            key: 'subscription_end_date',
            sorter: (a, b) => a?.subscription_end_date?.localeCompare(b?.subscription_end_date),
            render: (row, record) => <div>
                <div>
                    {record?.subscription_end_date ?
                        moment.utc(record?.subscription_end_date)?.format('MM-DD-YYYY') : <div align="middle">{"-"}</div>
                    }
                </div>
            </div>
        },
        {
            title: 'Duration',
            dataIndex: 'current_subscription_type',
            key: 'current_subscription_type',
            sorter: (a, b) => a?.current_subscription_type?.localeCompare(b?.current_subscription_type),
            render: (row, record) => <div>
                <div>{record?.current_subscription_type === "MO" ? "Monthly" : "Yearly"}</div>
            </div>
        },

    ];

    return (
        <>
            <div className='patients-search'>
                <div className='custom-search'>
                    <span className='icon'>
                        <PrefixSearch />
                    </span>
                    <DebounceInput
                        className='searchBox'
                        debounceTimeout={1000}
                        placeholder="Search Here"
                        onChange={(e) => searchSubscriber(e.target.value)}
                    />
                </div>
            </div>
            <Table
                bordered
                columns={columns}
                dataSource={subscriptionData || []}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
                scroll={{ x: 1200 }}
                className='check-pad-30'
            />
        </>
    )
}

export default Subscription