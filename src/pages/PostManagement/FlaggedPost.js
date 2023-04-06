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
import { searchData, searchFlaggedForumData } from '../../actions/dashboard';
import { deletePost, postFlaggedPostsList } from '../../actions/Post';

import '../../components/common/scss/FormField.scss'
import './Post.scss'
import { DebounceInput } from 'react-debounce-input';

const FlaggedPost = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [post, setPost] = useState();
    const [postId, setPostId] = useState(null)
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    let duration = moment(postId?.posted_at).fromNow()


    useEffect(() => {
        viewFlaggedPosts()
    }, [])


    //View All Records
    const viewFlaggedPosts = () => {
        dispatch(postFlaggedPostsList())
            .then((response) => {
                setPost(response?.feed_data)
            }).catch((error) => error?.message)
    }

    // Searching
    const searchFlaggedPosts = (value) => {
        const data = { search_data: value.trim(), modelname: "feed", app_name: 'allpost', search_type: 'flagged_posts' }
        dispatch(searchData(data))
            .then((res) => { setPost(res?.data) })
            .catch((err) => viewFlaggedPosts());
    };

    // View Model start
    const showViewModal = (record) => {
        setViewModalOpen(true);
        setPostId(record)
    };

    const handleViewCancel = () => {
        setViewModalOpen(false);
    };


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
                viewFlaggedPosts()
            }).catch((error) => toast.error(error?.message))
    }

    const handleDeleteCancel = () => setDeleteModalOpen(false);

    const columns = [
        {
            title: 'User Image',
            dataIndex: 'profile_img',
            key: 'profile_img',
            render: (row, record) => (
                <div className='image'>
                    <img src={record?.profile_img ? record.profile_img : toAbsoluteUrl('/images/user-img.svg')}
                        alt="Profile" title={record?.profile_img ? "" : "not found"} />
                </div>
            )
        },
        {
            title: 'User Name',
            dataIndex: 'user',
            key: 'user',
            sorter: (a, b) => a?.user?.localeCompare(b?.user),
            render: (row, record) => <div>
                <div>{record?.user} {" "} {record?.last_name} ({record?.user_type === "FU" ? "Funder" : "Broker"})</div>
            </div>
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a?.description?.localeCompare(b?.description),
            render: (row, record) => <div>
                <div> {record?.description.length > 20 ? record?.description.slice(0, 20) + "..." : record?.description}</div>
            </div>
        },
        {
            title: 'Posted date',
            dataIndex: 'posted_at',
            key: 'posted_at',
            sorter: (a, b) => moment(a?.posted_at)?.unix() - moment(b?.posted_at).unix(),
            render: (row, record) => <div>
                <div>{moment.utc(record?.posted_at)?.format("MM-DD-YYYY")}</div>
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
                    <Button className='action-btn' icon={<DeleteOutlined />} onClick={() => showDeleteModal(record)} />
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
                        onChange={(e) => searchFlaggedPosts(e.target.value)}
                    />
                </div>
            </div>

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
                title="Flagged Post Details"
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
                                <img src={postId?.profile_img ? postId.profile_img : toAbsoluteUrl('/images/user-img.svg')}
                                    alt="Profile" title={postId?.profile_img ? "" : "not found"} />
                            </figure>
                        </div>
                        <div className='post-desc'>
                            <h2 className='title'>{postId?.user} {" "} {postId?.last_name}</h2>
                            <span>{postId?.feed_category_id}</span>
                            <span className='time'>{duration}</span>
                        </div>
                    </div>

                    <br />

                    <div className='funder-detail'>
                        <ul>
                            {postId?.flagged_by?.length ?
                                <li>
                                    <span className='left'>Flagged By</span>
                                    <span className='right'>
                                        {postId?.flagged_by?.length < 3 ?
                                            postId?.flagged_by?.map((item, index) => <div key={index}>{item?.first_name} ({item?.user_type === "FU" ? "Funder" : " Broker"})</div>)
                                            :
                                            <textarea cols="42" rows="4" value={postId?.flagged_by?.map((item) => " " + item?.first_name)} disabled />
                                        }
                                    </span>
                                </li>
                                : ""}

                            <li>
                                <span className="left">Description</span>
                                <span className="right">
                                    {postId?.description?.length < 30 ? postId?.description : <textarea cols="42" rows="4" value={postId?.description} disabled />}
                                </span>
                            </li>
                        </ul>
                    </div>

                    {postId?.feed_media?.length === 1 ?
                        <div>
                            {postId?.feed_media?.map((item, index) => {
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
                            {postId?.feed_media?.map((item, index) => {
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
                        <span className='like'><Dollor />{postId?.like_by}</span>
                        {postId?.comment === 0 ?
                            <span className='comment'><CommentIcon />{postId?.comment}{" "}Comment</span>
                            :
                            <span className='comment' onClick={() => navigate(`/post-management/all-posts/${postId?.id}/flagged-post-comments`)} ><CommentIcon />{postId?.comment}  {postId?.comment <= 1 ? "Comment" : "Comments"}</span>
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

export default FlaggedPost