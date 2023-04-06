import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import moment from "moment";
import { toast } from "react-toastify";
import { Button, Modal, Space, Table } from "antd";
import { EyeOutlined, CheckCircleOutlined, CloseCircleOutlined, } from "@ant-design/icons";

import { PrefixSearch } from "../../svg";
import { toAbsoluteUrl } from "../../utils";
import { searchData } from "../../actions/dashboard";
import { formatPhoneNumber } from "../../utils/patterns";
import { postUserList, approveUser } from "../../actions/UserAction";

import "../../components/common/scss/FormField.scss";
import { DebounceInput } from "react-debounce-input";


const NewBrokerRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [initialUser, setInitialUser] = useState([]);
  const [userId, setUserId] = useState({});
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);


  useEffect(() => {
    newBrokerListing();
  }, []);


  //Listing
  const newBrokerListing = () => {
    const data = { user_type: "BR", is_approved: "pending", };
    dispatch(postUserList(data))
      .then((response) => { setInitialUser(response?.data); })
      .catch((error) => error?.message);
  };


  // Searching
  const searchNewBroker = (value) => {
    const data = { search_data: value.trim(), modelname: "user", app_name: "baseapp", search_type: "pending_users" };
    dispatch(searchData(data))
      .then((res) => {
        let newArray = res?.data?.filter((filterSearch) => filterSearch.user_type === "BR");
        setInitialUser(newArray);
      })
      .catch((err) => newBrokerListing());
  };


  //View Modal
  const showViewModal = (record) => { setViewModalOpen(true); setUserId(record); };

  const handleViewCancel = () => { setViewModalOpen(false); };


  //Approve Modal
  const showApproveModal = (record) => { setUserId(record); setApproveModalOpen(true); };

  const handleApproveOk = () => {
    let isApprove = { is_approved: "approved" };
    dispatch(approveUser(userId?.id, isApprove))
      .then((response) => {
        newBrokerListing();
        setApproveModalOpen(false);
        toast.success(response?.message);
        navigate("/broker-management");
      })
      .catch((error) => toast.error(error?.message));
  };

  const handleApproveCancel = () => { setApproveModalOpen(false); };


  //Reject Modal
  const showRejectModal = (record) => { setUserId(record); setRejectModalOpen(true); };

  const handleRejectOk = () => {
    let isApprove = { is_approved: "rejected" };
    dispatch(approveUser(userId?.id, isApprove))
      .then((response) => {
        newBrokerListing();
        setRejectModalOpen(false);
        toast.success(response?.message);
        navigate("/broker-management");
      })
      .catch((error) => toast.error(error?.message));
  };

  const handleRejectCancel = () => { setRejectModalOpen(false); };


  //Table Column
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (row, record) => (
        <div className="image">
          <img
            src={record?.profile_img ? record.profile_img : toAbsoluteUrl("/images/user-img.svg")}
            alt="profile_img"
            title={record?.profile_img ? "" : "not found"}
          />
        </div>
      ),
    },
    {
      title: "First name",
      dataIndex: "first_name",
      key: "first_name",
      sorter: (a, b) => a?.first_name?.localeCompare(b?.first_name),
      render: (row, record) => (
        <div>
          <div>{record?.first_name || "First name not found"}</div>
        </div>
      ),
    },
    {
      title: "Last name",
      dataIndex: "last_name",
      key: "last_name",
      sorter: (a, b) => a?.last_name?.localeCompare(b?.last_name),
      render: (row, record) => (
        <div>
          <div>{record?.last_name || "Last name not found"}</div>
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
          <div>{formatPhoneNumber(record?.phone_number) || "Phone number not found"}</div>
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
          <Button className="action-btn" title="View Details" icon={<EyeOutlined />} onClick={() => showViewModal(record)} />
          <Button className="action-btn" title="Approve" icon={<CheckCircleOutlined />} onClick={() => showApproveModal(record)} />
          <Button className="action-btn" title="Reject" icon={<CloseCircleOutlined />} onClick={() => showRejectModal(record)} />
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
            onChange={(e) => searchNewBroker(e.target.value)}
          />
        </div>
      </div>


      {/* Table */}
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
        title="Broker Details"
        open={viewModalOpen}
        className="common-modal footer-none"
        width={650}
        centered
        onCancel={handleViewCancel}
      >
        <div className="funder-detail">
          <div className="modal-image">
            <img
              src={
                userId?.profile_img
                  ? userId.profile_img
                  : toAbsoluteUrl("/images/user-img.svg")
              }
              alt=""
              title={userId?.profile_img ? "" : "not found"}
            />
          </div>
          <ul>
            <li>
              <span className="left">First name</span>
              <span className="right">{userId?.first_name}</span>
            </li>
            <li>
              <span className="left">Last name</span>
              <span className="right">{userId?.last_name}</span>
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
              <span className="left">City</span>
              <span className="right">{userId?.city || "City not found"}</span>
            </li>
            <li>
              <span className="left">State</span>
              <span className="right">
                {userId?.state || "State not found"}
              </span>
            </li>
            <li>
              <span className="left">Birthdate</span>
              <span className="right">
                {moment(userId?.dob).format("MM/DD/YYYY") ||
                  "Date of birth not found"}
              </span>
            </li>
            <li>
              <span className="left">Company name</span>
              <span className="right">
                {userId?.company_name || "Company name not found"}
              </span>
            </li>
            <li>
              <span className="left">Position</span>
              <span className="right">
                {userId?.position || "Position not found"}
              </span>
            </li>
            <li>
              <span className="left">Experience</span>
              <span className="right">
                {userId?.exp_value}{" "}
                {userId?.exp_type === "MO" && userId?.exp_value > 1
                  ? "Months"
                  : userId?.exp_type === "MO" && userId?.exp_value === 1
                    ? "Month"
                    : userId?.exp_type === "YR" && userId?.exp_value === 10
                      ? "Years+"
                      : userId?.exp_type === "YR" && userId?.exp_value > 1
                        ? "Years"
                        : "Year"}
              </span>
            </li>
            <li>
              <span className="left">Bio</span>
              <span className="right">{userId?.bio || "Bio not found"}</span>
            </li>
          </ul>
        </div>
      </Modal>


      {/* Approve Modal */}
      <Modal
        title="Approve"
        open={approveModalOpen}
        onOk={handleApproveOk}
        onCancel={handleApproveCancel}
        okText="Ok"
        cancelText="Cancel"
        centered
        className="delete-modal"
      >
        <div className="text-center desc">
          <CheckCircleOutlined />
          <p>Are you sure you want to approve ?</p>
        </div>
      </Modal>


      {/* Reject Modal */}
      <Modal
        title="Reject"
        open={rejectModalOpen}
        onOk={handleRejectOk}
        onCancel={handleRejectCancel}
        okText="Ok"
        cancelText="Cancel"
        centered
        className="delete-modal"
      >
        <div className="text-center desc">
          <CloseCircleOutlined />
          <p>Are you sure you want to reject ?</p>
        </div>
      </Modal>
    </>
  );
};
export default NewBrokerRequest;
