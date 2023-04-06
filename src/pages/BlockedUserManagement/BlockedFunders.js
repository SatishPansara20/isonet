import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Button, Modal, Space, Table } from 'antd'

import { toAbsoluteUrl } from '../../utils';
import { formatPhoneNumber } from '../../utils/patterns';
import { searchBlockedUser } from '../../actions/dashboard';
import { BlockIcon, PrefixSearch, UnBlockIcon } from '../../svg';
import { blockUser, postBlockedUserList } from '../../actions/UserAction';

import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';

const BlockedFunders = () => {

  const dispatch = useDispatch();

  const [initialUser, setInitialUser] = useState([]);
  const [userRecords, setUserRecords] = useState({});
  const [blockModalOpen, setBlockModalOpen] = useState(false);


  useEffect(() => {
    blockedFunderListing()
  }, [])


  //Listing
  const blockedFunderListing = () => {
    const data = { user_type: "FU", }
    dispatch(postBlockedUserList(data))
      .then((response) => { setInitialUser(response?.data) })
      .catch((error) => error?.message)
  }


  // Searching
  const searchBlockedFunder = (value) => {
    const data = { query: value.trim(), user_type: 'FU' }
    dispatch(searchBlockedUser(data)).then(res => setInitialUser(res.data)).catch(err => blockedFunderListing())
  }


  //Block Modal
  const showBlockModal = (record) => { setUserRecords(record); setBlockModalOpen(true) }

  const handleBlockOk = () => {
    const isBlocked = userRecords.is_blocked === true ? "False" : "True";
    const block = { is_blocked: isBlocked }
    dispatch(blockUser(userRecords.id, block))
      .then((response) => {
        blockedFunderListing();
        setBlockModalOpen(false);
        toast.success(response?.message)
      }).catch((error) => toast.error(error?.message))
  }
  const handleBlockCancel = () => { setBlockModalOpen(false) }


  // Table Columns
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (row, record) => (
        <div className='image'>
          <img src={record?.profile_img ? record.profile_img : toAbsoluteUrl('/images/user-img.svg')} alt="" title={record?.profile_img ? "" : "not found"} />
        </div>
      )
    },
    {
      title: 'First name',
      dataIndex: 'first_name',
      key: 'first_name',
      sorter: (a, b) => a?.first_name?.localeCompare(b?.first_name),
      render: (row, record) => (
        <div>
          <div>{record?.first_name || "First name not found"}</div>
        </div>
      )
    },
    {
      title: 'Last name',
      dataIndex: 'last_name',
      key: 'last_name',
      sorter: (a, b) => a?.last_name?.localeCompare(b?.last_name),
      render: (row, record) => (
        <div>
          <div>{record?.last_name || "Last name not found"}</div>
        </div>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a?.email?.localeCompare(b?.email),
      render: (row, record) => (
        <div>
          <div>{record?.email || "Email not found"}</div>
        </div>
      )
    },
    {
      title: 'Phone number',
      dataIndex: 'phone_number',
      key: 'phone_number',
      sorter: (a, b) => a?.phone_number - b?.phone_number,
      render: (row, record) => (
        <div>
          <div>{formatPhoneNumber(record?.phone_number) || "Phone number not found"}</div>
        </div>
      )
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      className: 'action',
      render: (row, record) =>
        <Space>
          <Button className='action-btn'
            icon={record.is_blocked === true ? <BlockIcon /> : <UnBlockIcon />}
            title={record?.is_blocked === true ? "Unblock" : "Block"}
            onClick={() => showBlockModal(record)}
          />
        </Space >
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
            onChange={(e) => searchBlockedFunder(e.target.value)}
          />
        </div>
      </div>


      {/* Table */}
      <Table
        bordered
        columns={columns}
        dataSource={initialUser || []}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        scroll={{ x: 1200 }}
        className='check-pad-30'
      />


      {/* Unblock Modal */}
      {userRecords?.is_blocked === true ?
        <Modal
          title="Unblock"
          open={blockModalOpen}
          onOk={handleBlockOk}
          onCancel={handleBlockCancel}
          okText="Ok"
          cancelText="Cancel"
          centered
          className='delete-modal'
        >
          <div className='text-center desc'>
            <UnBlockIcon />
            <p>Are you sure you want to unblock ?</p>
          </div>
        </Modal>
        :
        <Modal
          title="Block"
          open={blockModalOpen}
          onOk={handleBlockOk}
          onCancel={handleBlockCancel}
          okText="Ok"
          cancelText="Cancel"
          centered
          className='delete-modal'
        >
          <div className='text-center desc'>
            <UnBlockIcon />
            <p>Are you sure you want to block ?</p>
          </div>
        </Modal>
      }
    </>
  );
};

export default BlockedFunders;