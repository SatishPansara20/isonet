import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Button, Modal, Space, Table } from 'antd'

import { toAbsoluteUrl } from '../../utils';
import { formatPhoneNumber } from '../../utils/patterns';
import { searchData } from '../../actions/dashboard';
import { BlockIcon, PrefixSearch, UnBlockIcon } from '../../svg';
import { blockUser, postFlaggedUsersList } from '../../actions/UserAction';
import { EyeOutlined } from "@ant-design/icons";

import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';

const FlaggedUserManagement = () => {

    const dispatch = useDispatch();

    const [userId, setUserId] = useState({});
    const [initialUser, setInitialUser] = useState([]);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [blockModalOpen, setBlockModalOpen] = useState(false);

    useEffect(() => {
        flaggedUserListing();
    }, []);

    //Listing
    const flaggedUserListing = () => {
        dispatch(postFlaggedUsersList())
            .then((response) => {
                setInitialUser(response?.user_data);
            })
            .catch((error) => error?.message);
    };

    // Searching
    const searchFlaggedUser = (value) => {
        const data = { search_data: value.trim(), search_type: 'flagged_users', modelname: "user", app_name: "baseapp", };
        dispatch(searchData(data))
            .then((res) => { setInitialUser(res?.data) })
            .catch((err) => flaggedUserListing());
    };

    //View Modal
    const showViewModal = (record) => {
        setViewModalOpen(true);
        setUserId(record);
    };
    const handleViewCancel = () => {
        setViewModalOpen(false);
    };


    //Block Modal
    const showBlockModal = (record) => {
        setUserId(record);
        setBlockModalOpen(true);
    };

    const handleBlockOk = () => {
        const isBlocked = userId?.is_blocked === true ? "False" : "True";
        const block = { is_blocked: isBlocked };
        dispatch(blockUser(userId.id, block))
            .then((response) => {
                flaggedUserListing();
                setBlockModalOpen(false);
                toast.success(response?.message);
            })
            .catch((error) => toast.error(error?.message));
    };
    const handleBlockCancel = () => {
        setBlockModalOpen(false);
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (row, record) => (
                <div className="image">
                    <img
                        src={record?.profile_img ? record.profile_img : toAbsoluteUrl("/images/user-img.svg")}
                        alt="Profile"
                        title={record?.profile_img ? "" : "not found"}
                    />
                </div>
            ),
        },
        {
            title: "User Name",
            dataIndex: "first_name",
            key: "first_name",
            sorter: (a, b) => a?.first_name?.localeCompare(b?.first_name),
            render: (row, record) => (
                <div>
                    <div>{record?.first_name} {record?.last_name} ({record?.user_type === "FU" ? "Funder" : "Broker"})</div>
                </div>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: (a, b) => a?.email?.localeCompare(b?.email),
            render: (row, record) => (
                <div>
                    <div>{record?.email || "Email not found"}</div>
                </div>
            ),
        },
        {
            title: "Phone number",
            dataIndex: "phone_number",
            key: "phone_number",
            sorter: (a, b) => a?.phone_number - b?.phone_number,
            render: (row, record) => (
                <div>
                    <div>
                        {formatPhoneNumber(record?.phone_number) ||
                            "Phone number not found"}
                    </div>
                </div>
            ),
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            className: "action",
            render: (row, record) => (
                <Space>
                    <Button
                        className="action-btn"
                        title="View"
                        icon={<EyeOutlined />}
                        onClick={() => showViewModal(record)}
                    />
                    <Button
                        className="action-btn"
                        icon={record.is_blocked === true ? <BlockIcon /> : <UnBlockIcon />}
                        title={record?.is_blocked === true ? "Unblock" : "Block"}
                        onClick={() => showBlockModal(record)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="patients-search">
                <div className="custom-search">
                    <span className="icon">
                        <PrefixSearch />
                    </span>
                    <DebounceInput
                        className="searchBox"
                        debounceTimeout={1000}
                        placeholder="Search Here"
                        onChange={(e) => searchFlaggedUser(e.target.value)}
                    />
                </div>
            </div>
            <Table
                bordered
                columns={columns}
                dataSource={initialUser || []}
                pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 20, 50, 100],
                }}
                scroll={{ x: 1200 }}
                className="check-pad-30"
            />


            {/* View Model */}
            <Modal
                title="Flagged User Details"
                open={viewModalOpen}
                className="common-modal footer-none"
                width={650}
                centered
                onCancel={handleViewCancel}
            >
                <div className="funder-detail">
                    <div className="modal-image">
                        <img
                            src={userId?.profile_img ? userId.profile_img : toAbsoluteUrl("/images/user-img.svg")}
                            alt="Profile"
                            title={userId?.first_name ? "" : "not found"}
                        />
                    </div>
                    <ul>
                        <li>
                            <span className="left">User Name</span>
                            <span className="right">{userId?.first_name} {userId?.last_name} ({userId?.user_type === "BR" ? "Broker" : "Funder"})</span>
                        </li>
                        <li>
                            <span className="left">Email</span>
                            <span className="right">{userId?.email}</span>
                        </li>
                        <li>
                            <span className="left">Phone number</span>
                            <span className="right">
                                {formatPhoneNumber(userId?.phone_number)}
                            </span>
                        </li>
                        <li>
                            <span className="left">Flagged By</span>
                            <span className="right">
                                <span className='right'>
                                    {userId?.flagged_by_users?.length < 3 ?
                                        userId?.flagged_by_users?.map((item, index) =>
                                            <div key={index}>
                                                {item?.first_name} {" "} ({item?.user_type === "FU" ? "Funder" : "Broker"})
                                            </div>)
                                        :
                                        <textarea cols={55} rows={4} value={userId?.flagged_by_users?.map((item) => item?.first_name)} disabled />
                                    }
                                </span>
                            </span>
                        </li>
                    </ul>
                </div>
            </Modal>

            {/* Block Modal */}
            {userId?.is_blocked === false ? (
                <Modal
                    title="Block"
                    open={blockModalOpen}
                    onOk={handleBlockOk}
                    onCancel={handleBlockCancel}
                    okText="Ok"
                    cancelText="Cancel"
                    centered
                    className="delete-modal"
                >
                    <div className="text-center desc">
                        <BlockIcon />
                        <p>Are you sure you want to block ?</p>
                    </div>
                </Modal>
            ) : (
                <Modal
                    title="Unblock"
                    open={blockModalOpen}
                    onOk={handleBlockOk}
                    onCancel={handleBlockCancel}
                    okText="Ok"
                    cancelText="Cancel"
                    centered
                    className="delete-modal"
                >
                    <div className="text-center desc">
                        <UnBlockIcon />
                        <p>Are you sure you want to Unblock ?</p>
                    </div>
                </Modal>
            )}

        </>
    )
}

export default FlaggedUserManagement
