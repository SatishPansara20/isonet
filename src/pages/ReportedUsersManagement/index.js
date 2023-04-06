import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Button, Modal, Space, Table } from 'antd'

import { toAbsoluteUrl } from '../../utils';
import { formatPhoneNumber } from '../../utils/patterns';
import { BlockIcon, PrefixSearch, UnBlockIcon } from '../../svg';
import { blockUser, postReportedUsersList, postReportedUsersSearch } from '../../actions/UserAction';
import { EyeOutlined } from "@ant-design/icons";

import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';

const ReportedUserManagement = () => {

    const dispatch = useDispatch();

    const [userId, setUserId] = useState({});
    const [initialUser, setInitialUser] = useState([]);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [blockModalOpen, setBlockModalOpen] = useState(false);

    useEffect(() => {
        reportedUsersListing();
    }, []);

    //Listing
    const reportedUsersListing = () => {
        const data = { report_type: "User" }
        dispatch(postReportedUsersList(data))
            .then((response) => {
                console.log(`response:`, response?.report_listing_data);
                setInitialUser(response?.report_listing_data);
            })
            .catch((error) => error?.message);
    };

    // Searching
    const searchReportedUser = (value) => {
        const data = { report_type: "User", search: value.trim() };
        dispatch(postReportedUsersSearch(data))
            .then((res) => { setInitialUser(res?.report_listing_data) })
            .catch((err) => reportedUsersListing());
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
        console.log(userId?.reported_user?.user_id)
        setBlockModalOpen(true);
    };

    const handleBlockOk = () => {
        const isBlocked = userId?.reported_user?.is_blocked === true ? "False" : "True";
        const block = { is_blocked: isBlocked };
        dispatch(blockUser(userId?.reported_user?.user_id, block))
            .then((response) => {
                reportedUsersListing();
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
                        src={record?.reported_user?.profile_img ? record?.reported_user?.profile_img : toAbsoluteUrl("/images/user-img.svg")}
                        alt="Profile"
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
                    <div>{record?.reported_user?.first_name} {record?.reported_user?.last_name} ({record?.reported_user?.user_type === "BR" ? "Broker" : "Funder"})</div>
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
                    <div>{record?.reported_user?.email || "Email not found"}</div>
                </div>
            ),
        },
        {
            title: "Reported By",
            dataIndex: "first_name",
            key: "first_name",
            sorter: (a, b) => a?.email?.localeCompare(b?.email),
            render: (row, record) => (
                <div>
                    <div>{record?.reported_by_user?.first_name} {record?.reported_by_user?.last_name} ({record?.reported_by_user?.user_type === "BR" ? "Broker" : "Funder"})</div>
                </div>
            ),
        },
        {
            title: "Report Reason",
            dataIndex: "description",
            key: "description",
            sorter: (a, b) => a?.email?.localeCompare(b?.email),
            render: (row, record) => (
                <div>
                    <div>{record?.description}</div>
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
                        icon={record?.reported_user?.is_blocked ? <BlockIcon /> : <UnBlockIcon />}
                        title={record?.reported_user?.is_blocked ? "Unblock" : "Block"}
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
                        onChange={(e) => searchReportedUser(e.target.value)}
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
                title="Reported User Details"
                open={viewModalOpen}
                className="common-modal footer-none"
                width={650}
                centered
                onCancel={handleViewCancel}
            >
                <div className="funder-detail">
                    <div className="modal-image">
                        <img
                            src={userId?.reported_user?.profile_img || toAbsoluteUrl("/images/user-img.svg")}
                            alt="Profile"
                        />
                    </div>
                    <ul>
                        <li>
                            <span className="left">User Name</span>
                            <span className="right">{userId?.reported_user?.first_name} {userId?.reported_user?.last_name} ({userId?.reported_user?.user_type === "BR" ? "Broker" : "Funder"})</span>
                        </li>
                        <li>
                            <span className="left">Email</span>
                            <span className="right">{userId?.reported_user?.email}</span>
                        </li>
                        <li>
                            <span className="left">Phone number</span>
                            <span className="right">
                                {formatPhoneNumber(userId?.reported_user?.phone_number)}
                            </span>
                        </li>
                        <li>
                            <span className="left">Reported By</span>
                            <span className="right">
                                {userId?.reported_by_user?.first_name} {userId?.reported_by_user?.last_name} ({userId?.reported_by_user?.user_type === "BR" ? "Broker" : "Funder"})
                            </span>
                        </li>
                        <li>
                            <span className="left">Reported Reason</span>
                            <span className="right">
                                {userId?.description?.length < 30 ?
                                    <div>{userId?.description}</div>
                                    :
                                    <textarea cols="55" rows="4" value={userId?.description} />
                                }
                            </span>
                        </li>
                        {/* <li>
                            <span className="left">City</span>
                            <span className="right">{userId?.reported_user?.city}</span>
                        </li>
                        <li>
                            <span className="left">State</span>
                            <span className="right">{userId?.reported_user?.state}</span>
                        </li>
                        <li>
                            <span className="left">Birth date</span>
                            <span className="right">
                                {moment(userId?.dob).format("MM/DD/YYYY") ||
                                    "Date of birth not found"}
                            </span>
                        </li>
                        <li>
                            <span className="left">Company name</span>
                            <span className="right">
                                {userId?.reported_user?.company_name || "Company name not found"}
                            </span>
                        </li>
                        <li>
                            <span className="left">Position</span>
                            <span className="right">{userId?.reported_user?.position}</span>
                        </li>
                        <li>
                            <span className="left">Experience</span>
                            <span className="right">
                                {userId?.reported_user?.exp_value}{" "}
                                {userId?.reported_user?.exp_type === "MO" && userId?.reported_user?.exp_value > 1
                                    ? "Months"
                                    : userId?.reported_user?.exp_type === "MO" && userId?.reported_user?.exp_value === 1
                                        ? "Month"
                                        : userId?.reported_user?.exp_type === "YR" && userId?.reported_user?.exp_value === 10
                                            ? "Years+"
                                            : userId?.reported_user?.exp_type === "YR" && userId?.reported_user?.exp_value > 1
                                                ? "Years"
                                                : "Year"}
                            </span>
                        </li>
                        <li>
                            <span className="left">Bio</span>
                            <span className="right">{userId?.reported_user?.bio}</span>
                        </li> */}
                    </ul>
                </div>
            </Modal>

            {/* Block Modal */}
            {userId?.reported_user?.is_blocked === false ? (
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

export default ReportedUserManagement
