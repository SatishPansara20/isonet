import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import moment from 'moment';
import { Pagination } from "swiper";
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from "swiper/react";
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Table } from 'antd'

import { toAbsoluteUrl } from '../../utils';
import { CommentIcon, LikeIcon, PrefixSearch } from '../../svg';
import { deleteForum, ReportedForumList, reportedForumSearch } from '../../actions/Forum';

import '../PostManagement/Post.scss'
import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';


const ReportedForums = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [reportedForum, setReportedForum] = useState([]);
  const [reportedForumId, setReportedForumId] = useState();
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  //Find time duration
  let duration = moment(reportedForumId?.reported_forum?.posted_at).fromNow();


  useEffect(() => {
    reportedForumList()
  }, [])


  //Reported Forum Listing
  const reportedForumList = () => {
    const data = { report_type: "Forum" }
    dispatch(ReportedForumList(data))
      .then((response) => {
        if (response.status === 200) {
          setReportedForum(response?.report_listing_data)
        }
      }).catch((error) => (error?.message))
  }

  // Searching
  const ReportedForumSearch = (value) => {
    const data = { report_type: "Forum", search: value.trim() };
    dispatch(reportedForumSearch(data))
      .then((res) => { setReportedForum(res?.report_listing_data); })
      .catch((err) => reportedForumList());
  };


  // View Model start
  const showViewModal = (record) => { setViewModalOpen(true); setReportedForumId(record) };

  const handleViewCancel = () => { setViewModalOpen(false); };


  //Delete Model start
  const showDeleteModal = (record) => {
    setDeleteModalOpen(true);
    setReportedForumId(record?.forum_id)
  }

  const handleDeleteOk = () => {
    const data = { forum_id: reportedForumId }
    dispatch(deleteForum(data))
      .then((response) => {
        toast.success(response?.message)
        setDeleteModalOpen(false)
        reportedForumList()
      }).catch((error) => toast.error(error?.message))
  }

  const handleDeleteCancel = () => setDeleteModalOpen(false);


  // Table Columns
  const columns = [
    {
      title: 'User Image',
      dataIndex: 'company_image',
      key: 'company_image',
      render: (row, record) =>
        <div className='image'>
          <img src={record?.reported_forum?.user?.profile_img ? record?.reported_forum?.user?.profile_img : toAbsoluteUrl('/images/user-img.svg')} alt="Profile" />
        </div>
    },
    {
      title: 'User Name',
      dataIndex: 'user',
      key: 'user',
      sorter: (a, b) => a?.reported_forum?.user?.first_name?.localeCompare(b?.reported_forum?.user?.first_name),
      render: (row, record) => <div>
        <div>{record?.reported_forum?.user?.first_name} {" "} {record?.reported_forum?.user?.last_name}  ({record?.reported_forum?.user?.user_type === "FU" ? "Funder" : "Broker"})</div>
      </div>
    },
    {
      title: 'Report Reason',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a?.description?.localeCompare(b?.description),
      render: (row, record) => <div>
        <div> {record?.description.length > 20 ? record?.description.slice(0, 20) + "..." : record?.description}</div>
      </div>
    },
    {
      title: 'Reported By',
      dataIndex: 'reported_by_user',
      key: 'reported_by_user',
      render: (row, record) =>
        <div>
          <div>{record?.reported_by_user?.first_name} {record?.reported_by_user?.last_name} ({record?.reported_by_user?.user_type === "FU" ? "Funder" : "Broker"})</div>
        </div>
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      className: 'action',
      render: (row, record) =>
        <Space>
          <Button className='action-btn' icon={<EyeOutlined />} onClick={() => showViewModal(record)} />
          <Button className='action-btn' icon={<DeleteOutlined />} onClick={() => showDeleteModal(record?.reported_forum)} />
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
            onChange={(e) => ReportedForumSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <Table
        bordered
        columns={columns}
        dataSource={reportedForum || []}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        scroll={{ x: 1200 }}
        className='check-pad-30'
      />


      {/* View Modal */}
      <Modal
        title="Reported Forum Details"
        open={viewModalOpen}
        className='common-modal post-modal footer-none'
        width={550}
        centered
        onCancel={handleViewCancel}
      >
        <div className='post-detail'>
          <div className='d-flex flex-wrap'>
            <div className='post-image'>
              <figure>
                <img src={reportedForumId?.reported_forum?.user?.profile_img ? reportedForumId?.reported_forum?.user?.profile_img : toAbsoluteUrl('/images/user-img.svg')} alt="Profile" />
              </figure>
            </div>
            <div className='post-desc'>
              <h2 className='title'>{reportedForumId?.reported_forum?.user?.first_name} {" "} {reportedForumId?.reported_forum?.user?.last_name}</h2>
              <span>{reportedForumId?.reported_forum?.forum_category_name}</span>
              <span className='time'>{duration}</span>
            </div>
          </div>
          <br />

          <div className='funder-detail'>
            <ul>
              <li>
                <span className='left'>Description</span>
                <span className='right'>
                  {reportedForumId?.reported_forum?.description?.length < 30 ? <div>{reportedForumId?.reported_forum?.description}</div>
                    :
                    <textarea cols="42" rows="3" value={reportedForumId?.reported_forum?.description} disabled />
                  }
                </span>
              </li>

              <li>
                <span className='left'>Reported By</span>
                <span className='right'>
                  {reportedForumId?.reported_by_user?.first_name} {reportedForumId?.reported_by_user?.last_name} ({reportedForumId?.reported_by_user?.user_type === "FU" ? "Funder" : "Broker"})
                </span>
              </li>

              <li>
                <span className="left">Report Reason</span>
                <span className="right">
                  {reportedForumId?.description?.length < 30 ? reportedForumId?.description : <textarea cols="42" rows="4" value={reportedForumId?.description} disabled />}
                </span>
              </li>

            </ul>
          </div>

          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            loop='true'
            modules={[Pagination]}
            className="mySwiper"
          >
            {reportedForumId?.reported_forum?.forum_media?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className='multiple-img'>
                    {item?.media_type === 'video' ?
                      <a href={item.forum_media} target="_blank" rel='noreferrer'>
                        <video height="100%" width='100%' poster={item?.thumbnail} controls>
                          <source src={item?.forum_media} type="video/mp4" />
                          <source src={item?.forum_media} type="video/ogg" />
                          Your browser does not support the video tag.
                        </video>
                      </a>
                      :
                      <figure>
                        <a href={item?.forum_media} target="_blank" rel='noreferrer'>
                          <img src={item?.forum_media} alt="Media" className='hi' />
                        </a>
                      </figure>
                    }
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
          <div className='footer-post'>
            <span className='like'><LikeIcon />{reportedForumId?.reported_forum?.likes}</span>
            {reportedForumId?.reported_forum?.comment === 0 ?
              <span className='comment'><CommentIcon />{reportedForumId?.reported_forum?.comment}{" "}Comment</span>
              :
              <span className='comment' onClick={() => navigate(`/forums-management/all-forums/${reportedForumId?.reported_forum?.forum_id}/forum-comments`)} ><CommentIcon />{reportedForumId?.reported_forum?.comment}  {reportedForumId?.reported_forum?.comment <= 1 ? "Comment" : "Comments"}</span>
            }
          </div>
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

export default ReportedForums;

