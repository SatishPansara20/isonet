import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import moment from 'moment';
import { Pagination } from "swiper";
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Modal, Space, Table } from 'antd'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';

import { toAbsoluteUrl } from '../../utils';
import { CommentIcon, Dollor, PrefixSearch } from '../../svg';
import { searchReportedPost } from '../../actions/dashboard';
import { deletePost, postReportedPostList } from '../../actions/Post';

import './Post.scss'
import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';

const ReportedPosts = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [post, setPost] = useState([]);
  const [postId, setPostId] = useState(null)
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  let duration = moment(postId?.reported_feed?.posted_at).fromNow()

  useEffect(() => {
    viewReportedPosts()
  }, [])


  //View All Records
  const viewReportedPosts = () => {
    const data = { report_type: "Feed" }
    dispatch(postReportedPostList(data))
      .then((response) => { setPost(response?.report_listing_data) })
      .catch((error) => error?.message)
  }


  // Searching
  const searchReportedPosts = (value) => {
    const data = { search: value.trim(), report_type: "Feed", }
    dispatch(searchReportedPost(data)).then(res => setPost(res?.report_listing_data)).catch(err => viewReportedPosts())
  }

  //   // View Model
  const showViewModal = (record) => {
    setViewModalOpen(true);
    setPostId(record)
  };

  const handleViewCancel = () => { setViewModalOpen(false); };



  //Delete Model start
  const showDeleteModal = (record) => {
    setDeleteModalOpen(true);
    setPostId(record?.id)
  }

  const handleDeleteOk = () => {
    dispatch(deletePost(postId))
      .then((response) => {
        toast.success(response?.message)
        setDeleteModalOpen(false)
        viewReportedPosts()
      }).catch((error) => toast.error(error?.message))
  }

  const handleDeleteCancel = () => setDeleteModalOpen(false);

  // Table Columns
  const columns = [
    {
      title: 'User Image',
      dataIndex: 'profile_img',
      key: 'profile_img',
      render: (row, record) => (
        <div className='image'>
          <img src={record?.reported_feed?.profile_img ? record?.reported_feed?.profile_img : toAbsoluteUrl('/images/user-img.svg')}
            alt="Profile" title={record?.reported_feed?.profile_img ? "" : "not found"} />
        </div>
      )
    },
    {
      title: 'User Name',
      dataIndex: 'user',
      key: 'user',
      sorter: (a, b) => a?.reported_feed?.user?.localeCompare(b?.reported_feed?.user),
      render: (row, record) => <div>
        <div>{record?.reported_feed?.user} {" "} {record?.reported_feed?.last_name} ({record?.user_type === "FU" ? "Funder" : "Broker"})</div>
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
          <Button className='action-btn' icon={<EyeOutlined />} onClick={() => showViewModal(record)} title="View" />
          <Button className='action-btn' icon={<DeleteOutlined />} onClick={() => showDeleteModal(record?.reported_feed)} />
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
            onChange={(e) => searchReportedPosts(e.target.value)}
          />
        </div>
      </div>


      {/* Table */}
      <Table
        bordered
        columns={columns}
        dataSource={post || []}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        scroll={{ x: 1200 }}
        className='check-pad-30'
      />


      {/* View Modal */}
      <Modal
        title="Reported Post Details"
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
                <img src={postId?.reported_feed?.profile_img ? postId?.reported_feed?.profile_img : toAbsoluteUrl('/images/user-img.svg')}
                  alt="Profile" />
              </figure>
            </div>
            <div className='post-desc'>
              <h2 className='title'>{postId?.reported_feed?.user} {" "} {postId?.reported_feed?.last_name}</h2>
              <span>{postId?.reported_feed?.feed_category_id}</span>
              <span className='time'>{duration}</span>
            </div>
          </div>

          <br />

          <div className='funder-detail'>
            <ul>
              <li>
                <span className="left">Description</span>
                <span className="right">
                  {postId?.reported_feed?.description?.length < 30 ? postId?.reported_feed?.description : <textarea cols="42" rows="4" value={postId?.reported_feed?.description} disabled />}
                </span>
              </li>


              <li>
                <span className='left'>Reported By</span>
                <span className='right'>
                  {postId?.reported_by_user?.first_name} {postId?.reported_by_user?.last_name} ({postId?.reported_by_user?.user_type === "FU" ? "Funder" : "Broker"})
                </span>
              </li>

              <li>
                <span className="left">Report Reason</span>
                <span className="right">
                  {postId?.description?.length < 30 ? postId?.description : <textarea cols="42" rows="4" value={postId?.description} disabled />}
                </span>
              </li>

            </ul>
          </div>

          {postId?.reported_feed?.feed_media?.length === 1 ?
            <div>
              {postId?.reported_feed?.feed_media?.map((item, index) => {
                return (
                  <div key={index} className='multiple-img'>
                    {item?.media_type === 'video' ?
                      <a href={item.feed_media} target="_blank" rel='noreferrer'>
                        <video height="100%" width='100%' poster={item?.thumbnail} controls>
                          <source src={item.feed_media} type="video/mp4" />
                          <source src={item.feed_media} type="video/ogg" />
                          Your browser does not support the video tag.
                        </video>
                      </a>
                      :
                      <figure>
                        <a href={item.feed_media} target="_blank" rel='noreferrer'>
                          <img src={item.feed_media} alt="Media" className='hi' />
                        </a>
                      </figure>
                    }
                  </div>
                )
              })}
            </div>
            :
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
              {postId?.reported_feed?.feed_media?.map((item, index) => {
                return (

                  <SwiperSlide key={index}>
                    <div className='multiple-img'>
                      {item?.media_type === 'video' ?
                        <a href={item.feed_media} target="_blank" rel='noreferrer'>
                          <video height="100%" width='100%' poster={item?.thumbnail} controls>
                            <source src={item.feed_media} type="video/mp4" />
                            <source src={item.feed_media} type="video/ogg" />
                            Your browser does not support the video tag.
                          </video>
                        </a>
                        :
                        <figure>
                          <a href={item.feed_media} target="_blank" rel='noreferrer'>
                            <img src={item.feed_media} alt="Media" className='hi' />
                          </a>
                        </figure>
                      }
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          }

          <div className='footer-post'>
            <span className='like'><Dollor />{postId?.reported_feed?.like_by}</span>
            {postId?.reported_feed?.comment === 0 ?
              <span className='comment'><CommentIcon />{postId?.reported_feed?.comment} Comment</span>
              :
              <span className='comment' onClick={() => navigate(`/post-management/all-posts/${postId?.reported_feed?.id}/reported-post-comments`)} ><CommentIcon />{postId?.reported_feed?.comment}  {postId?.reported_feed?.comment <= 1 ? "Comment" : "Comments"}</span>
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
  )
}

export default ReportedPosts;