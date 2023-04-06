import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import moment from "moment";
import { toast } from "react-toastify";
import { Button, Space, Table, Modal, Form } from "antd";
import { EyeOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined, } from "@ant-design/icons";

import { toAbsoluteUrl } from "../../utils";
import { searchData } from "../../actions/dashboard";
import { formatPhoneNumber } from "../../utils/patterns";
import { BlockIcon, UnBlockIcon, PrefixSearch } from "../../svg";
import { postUserList, deleteUser, blockUser, verifyUser, } from "../../actions/UserAction";

import "../../components/common/scss/FormField.scss";
import { DebounceInput } from "react-debounce-input";


const BrokerManagement = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [userId, setUserId] = useState();
  const [initialUser, setInitialUser] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);


  useEffect(() => {
    brokerListing();
  }, []);


  //Listing
  const brokerListing = () => {
    const data = { user_type: "BR", is_approved: "approved", };
    dispatch(postUserList(data))
      .then((response) => { setInitialUser(response?.data); })
      .catch((error) => error?.message);
  };


  // Searching
  const searchBroker = (value) => {
    const data = { search_data: value.trim(), modelname: "user", app_name: "baseapp", };
    dispatch(searchData(data))
      .then((res) => {
        let newArray = res?.data?.filter((filterSearch) => filterSearch.user_type === "BR");
        setInitialUser(newArray);
      })
      .catch((err) => brokerListing());
  };


  //View Modal
  const showViewModal = (record) => { setViewModalOpen(true); setUserId(record); };

  const handleViewCancel = () => { setViewModalOpen(false); };


  //Delete Modal
  const showDeleteModal = (record) => { setUserId(record); setDeleteModalOpen(true); };

  const handleDeleteOk = () => {
    dispatch(deleteUser(userId))
      .then((response) => {
        brokerListing();
        setDeleteModalOpen(false);
        toast.success(response?.message);
      })
      .catch((error) => toast.error(error?.message));
  };

  const handleDeleteCancel = () => { setDeleteModalOpen(false); };


  //Block Modal
  const showBlockModal = (record) => { setUserId(record); setBlockModalOpen(true); };

  const handleBlockOk = () => {
    const isBlocked = userId.is_blocked === true ? "False" : "True";
    const block = { is_blocked: isBlocked };
    dispatch(blockUser(userId.id, block))
      .then((response) => {
        brokerListing();
        setBlockModalOpen(false);
        toast.success(response?.message);
      })
      .catch((error) => toast.error(error?.message));
  };

  const handleBlockCancel = () => { setBlockModalOpen(false); };


  //Verify Modal
  const showVerifyModal = (record) => { setVerifyModalOpen(true); setUserId(record); };

  const handleVerifyOk = () => {
    const isVerified = userId?.is_verified === true ? "unverify" : "verify";
    const verify = { is_verified: isVerified, user_id: userId.id };
    dispatch(verifyUser(verify))
      .then((response) => {
        form.setFieldsValue({ brokerSearch: "" });
        toast.success(response?.message);
        brokerListing();
        setVerifyModalOpen(false);
      })
      .catch((error) => toast.error(error?.message));
  };

  const handleVerifyCancel = () => setVerifyModalOpen(false);


  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (row, record) => (
        <div className="image">
          {/* {record?.is_verified === true ? <img style={{ position: "absolute", top: "55px", left: "55px", width: "25px", height: "25px" }} src="https://img.icons8.com/fluency/48/null/instagram-check-mark.png" alt='' /> : ""} */}
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
          <div>{record?.first_name || ""}</div>
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
          <div>{record?.last_name || ""}</div>
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
          <div>{record?.email || ""}</div>
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
          <div>{formatPhoneNumber(record?.phone_number) || ""}</div>
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
          <Button className="action-btn" title="View" icon={<EyeOutlined />} onClick={() => showViewModal(record)} />

          <Button className="action-btn" icon={<DeleteOutlined />} onClick={() => showDeleteModal(record?.id)} />

          <Button className="action-btn"
            icon={record.is_blocked === true ? <BlockIcon /> : <UnBlockIcon />}
            title={record?.is_blocked === true ? "Unblock" : "Block"}
            onClick={() => showBlockModal(record)}
          />

          <Button
            className="action-btn"
            icon={
              record.is_verified === true ? (
                <CheckCircleOutlined style={{ color: "#D79600" }} />
              ) : (
                  <CheckCircleOutlined style={{ color: "#808080" }} />
              )
            }
            title={record?.is_verified === true ? "Unverify" : "Verify"}
            onClick={() => showVerifyModal(record)}
          />
        </Space >
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
            onChange={(e) => searchBroker(e.target.value)}
          />
        </div>
        <div className="btn-list">
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => navigate("/new-broker-requests")}
          >
            {" "}
            New Broker Requests
          </Button>
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
              <span className="right">{userId?.city}</span>
            </li>
            <li>
              <span className="left">State</span>
              <span className="right">{userId?.state}</span>
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
              <span className="right">{userId?.position}</span>
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
              <span className="right">{userId?.bio}</span>
            </li>
          </ul>
        </div>
      </Modal>


      {/* Delete Modal */}
      <Modal
        title="Delete"
        open={deleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
        centered
        className="delete-modal"
      >
        <div className="text-center desc">
          <DeleteOutlined />
          <p>Are you sure you want to delete ?</p>
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
            <BlockIcon />
            <p>Are you sure you want to Unblock ?</p>
          </div>
        </Modal>

      )}


      {/* Verify Modal */}
      {userId && userId?.is_verified === false ? (
        <Modal
          title="Verify"
          open={verifyModalOpen}
          onOk={handleVerifyOk}
          onCancel={handleVerifyCancel}
          okText="Ok"
          cancelText="Cancel"
          centered
          className="delete-modal"
        >
          <div className="text-center desc">
            <CheckCircleOutlined />
            <p>Are you sure you want to verify ?</p>
          </div>
        </Modal>
      ) : (
        <Modal
          title="Unverify"
          open={verifyModalOpen}
          onOk={handleVerifyOk}
          onCancel={handleVerifyCancel}
          okText="Ok"
          cancelText="Cancel"
          centered
          className="delete-modal"
        >
          <div className="text-center desc">
            <CheckCircleOutlined />
            <p>Are you sure you want to unverify ?</p>
          </div>
        </Modal>
      )}
    </>
  );
};
export default BrokerManagement;
