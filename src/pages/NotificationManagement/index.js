import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { toast } from 'react-toastify';
import { Button, Modal, Space, Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { deleteNotification, getNotification, getNotificationInfo, searchNotification } from '../../actions/dashboard';

import '../PostManagement/Post.scss'
import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';
import moment from 'moment';
import { PrefixSearch } from '../../svg';


const NotificationManagement = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [notificationId, setNotificationeId] = useState();
  const [initialNotification, setInitialNotification] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  //Listing Article
  useEffect(() => {
    viewNotification()
  }, [])


  //View All Records
  const viewNotification = () => {
    dispatch(getNotification())
      .then((response) => {
        setInitialNotification(response?.data)
      }).catch((error) => error?.message)
  }

  //Article Searching
  const searchNotifications = (value) => {
    dispatch(searchNotification({ query: value.trim() })).then(res => setInitialNotification(res.data)).catch(err => viewNotification())
  }

  //Delete Modal 
  const showDeleteModal = (record) => {
    setDeleteModalOpen(true);
    dispatch(getNotificationInfo({ schedule_noti_id: record }))
      .then((response) => {
        setNotificationeId(response?.data?.id)
      }).catch((error) => error?.message)
  }

  const handleDeleteOk = () => {
    dispatch(deleteNotification({ schedule_noti_id: notificationId }))
      .then((response) => {
        toast.success(response?.message)
        setDeleteModalOpen(false)
        viewNotification();
      }).catch((error) => toast.error(error?.message))
  }

  const handleDeleteCancel = () => setDeleteModalOpen(false);


  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a?.title?.localeCompare(b?.title),
      render: (row, record) => <div>
        <div>{record?.title}</div>
      </div>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a?.description?.localeCompare(b?.description),
      render: (row, record) => <div>
        <div>{record?.description.length > 30 ? record?.description.slice(0, 40) + "..." : record?.description}</div>
      </div>
    },
    {
      title: 'Schedule Date & Time',
      dataIndex: 'schedule_at_date',
      key: 'schedule_at_date',

      sorter: (a, b) => a?.schedule_at_date?.localeCompare(b?.schedule_at_date),
      render: (row, record) => <div>
        <div>{moment(record?.date_time).format("MM-DD-YYYY hh:mm a")}</div>
        <div></div>
      </div>
    },
    {
      title: 'Recurring',
      dataIndex: 'time_interval',
      key: 'time_interval',

      sorter: (a, b) => a?.time_interval?.localeCompare(b?.time_interval),
      render: (row, record) => <div>
        <div>{record?.time_interval}</div>
        <div></div>
      </div>
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',

      sorter: (a, b) => a?.link?.localeCompare(b?.link),
      render: (row, record) => <div>
        <div>{record?.link || "------"}</div>
        <div></div>
      </div>
    },
    {
      title: 'User Type',
      dataIndex: 'user_type',
      key: 'user_type',

      sorter: (a, b) => a?.user_type?.localeCompare(b?.user_type),
      render: (row, record) => <div>
        <div>{record?.user_type === "FU" ? "Funder" : record?.user_type === "BR" ? "Broker" : "All"}</div>
      </div>
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      className: 'action',
      render: (row, record) =>
        <Space>
          {/* <Button className='action-btn' icon={<EyeOutlined />} onClick={() => showViewModal(record)} /> */}
          <Button className='action-btn' icon={<EditOutlined />} onClick={() => navigate(`/notification-management/edit-notification?${record?.id}`)} />
          <Button className='action-btn' icon={<DeleteOutlined />} onClick={() => showDeleteModal(record?.id)} />
        </Space>
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
            onChange={(e) => searchNotifications(e.target.value)}
          />
        </div>
        <div className='btn-list'>
          <Button type="primary" htmlType="submit" onClick={() => navigate('/notification-management/add-notification')}> Add Notification</Button>
        </div>
      </div>

      <Table
        bordered
        columns={columns}
        dataSource={initialNotification || []}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        scroll={{ x: 1200 }}
        className='check-pad-30'
      />

      {/* View Modal */}
      {/* <Modal
        title="Article Details"
        open={viewModalOpen}
        className='common-modal post-modal footer-none'
        width={500}
        centered
        onCancel={handleViewCancel}>

        <div className='funder-detail'>
          <ul>
            <li>
              <span className='left'>Article name</span>
              <span className='right'>{notificationId?.title}</span>
            </li>
            <li>
              <span className='left'>Author name</span>
              <span className='right'>{notificationId?.author_name}</span>
            </li>
            <li>
              <span className='left'>Description</span>
              <textarea className='right' cols={50} rows={3} value={notificationId?.description} disabled />
            </li>
            <br />

            <div className='post-image'>
              {notificationId?.article_media?.map((item, index) => {
                return (
                  <a key={index} href={item?.article_media} target="_blank" rel='noreferrer'>
                    <img src={item?.article_media ? item?.article_media : toAbsoluteUrl('/images/logo-icon.svg')} title={item?.article_media ? "" : "not found"} alt="Article" width={450} height={250} />
                  </a>
                )
              })}
            </div>

            <div className='post-detail'>
              <div className='footer-post'>
                <span className='like'><LikeIcon />{notificationId?.likes}</span>
                {notificationId?.comment === 0 ?
                  <span className='comment'><CommentIcon />{notificationId?.comment} Comment</span>
                  :
                  <span className='comment' onClick={() => navigate(`/article-management/all-article/${notificationId?.id}/article-comments`)} ><CommentIcon />{notificationId?.comment} Comments</span>
                }
              </div>
            </div>

          </ul>
        </div>
      </Modal> */}

      {/* Delete Modal */}
      <Modal
        title="Delete"
        open={deleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
        centered
        className='delete-modal'
      >
        <div className='text-center desc'>
          <DeleteOutlined />
          <p>Are you sure you want to delete ?</p>
        </div>
      </Modal>

    </>
  );
};

export default NotificationManagement;