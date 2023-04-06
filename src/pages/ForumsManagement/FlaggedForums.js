import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import moment from 'moment';
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from 'react-toastify';
import { deleteForum, getForumInfo, flaggedForumList } from '../../actions/Forum';
import { Button, Modal, Space, Table } from 'antd'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';


import { CommentIcon, LikeIcon, PrefixSearch } from '../../svg';
import { toAbsoluteUrl } from '../../utils';
import '../PostManagement/Post.scss'
import '../../components/common/scss/FormField.scss'
import { searchReportedForum } from '../../actions/dashboard';
import { DebounceInput } from 'react-debounce-input';


const FlaggedForums = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [flaggedForum, setFlaggedForum] = useState([]);
    const [reportedForumId, setReportedForumId] = useState();
    const [flaggedForumInfo, setFlaggedForumInfo] = useState({})
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    // count duration by date
    let duration = moment(flaggedForumInfo?.posted_at).fromNow();

    useEffect(() => {
        FlaggedForumList()
    }, [])


    //Listing
    const FlaggedForumList = () => {
        dispatch(flaggedForumList())
            .then((response) => { setFlaggedForum(response?.forum_data) })
            .catch((error) => (error?.message))
    }


    //Searching
    const searchFlaggedForum = (value) => {
        const data = { query: value?.trim(), search_type: "flagged_forums" }
        dispatch(searchReportedForum(data))
            .then((res) => { setFlaggedForum(res?.data?.forum_data) })
            .catch(err => FlaggedForumList())
    }


    // View Model start
    const showViewModal = (record) => {
        const data = { forum_id: record?.forum_id }
        setViewModalOpen(true);
        dispatch(getForumInfo(data))
            .then((response) => {
                setReportedForumId(response?.id)
                setFlaggedForumInfo(response?.data)
            })
    };

    const handleViewCancel = () => { setViewModalOpen(false); };


    //Delete Model start
    const showDeleteModal = (record) => { setDeleteModalOpen(true); setReportedForumId(record?.forum_id); }

    const handleDeleteOk = () => {
        const data = { forum_id: reportedForumId }
        dispatch(deleteForum(data))
            .then((response) => {
                setDeleteModalOpen(false)
                flaggedForumList()
                toast.success(response?.message)
            }).catch((error) => toast.error(error?.message))
    }

    const handleDeleteCancel = () => setDeleteModalOpen(false);


    // Table Columns
    const columns = [
        {
            title: 'User Image',
            dataIndex: 'company_image',
            key: 'company_image',
            render: (row, record) => <div className='image'>
                <img src={record?.user?.profile_img ? record?.user?.profile_img : toAbsoluteUrl('/images/user-img.svg')} alt="Profile" title={record?.user?.profile_img ? "" : "not found"} />
            </div>
        },
        {
            title: 'User Name',
            dataIndex: 'user',
            key: 'user',
            sorter: (a, b) => a?.user?.first_name?.localeCompare(b?.user?.first_name),
            render: (row, record) => <div>
                <div>{record?.user?.first_name}{" "}{record?.user?.last_name} ({record?.user?.user_type === "FU" ? "Funder" : "Broker"})</div>
            </div>
        },
        // {
        //     title: 'Category',
        //     dataIndex: 'forum_category_name',
        //     key: 'forum_category_name',
        //     sorter: (a, b) => a.forum_category_name?.localeCompare(b.forum_category_name),
        //     render: (row, record) => <div>
        //         <div>{record?.forum_category_name}</div>
        //     </div>
        // },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a?.description?.localeCompare(b?.description),
            render: (row, record) => <div>
                <div> {record?.description.length > 20 ? record?.description.slice(0, 20) + "..." : record?.description}</div >
            </div>
        },
        {
            title: 'Created At',
            dataIndex: 'posted_at',
            key: 'posted_at',
            sorter: (a, b) => a?.posted_at?.localeCompare(b?.posted_at),
            render: (row, record) => <div>
                <div>{moment.utc(record?.posted_at).format("MM-DD-YYYY")}</div>
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
                        onChange={(e) => searchFlaggedForum(e.target.value)}
                    />
                </div>
            </div>


            {/* Table */}
            <Table
                bordered
                columns={columns}
                dataSource={flaggedForum || []}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
                scroll={{ x: 1200 }}
                className='check-pad-30'
            />


            {/* View Modal */}
            <Modal
                title="Flagged Forum Details"
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
                                <img src={flaggedForumInfo?.user?.profile_img ? flaggedForumInfo?.user?.profile_img : toAbsoluteUrl('/images/user-img.svg')}
                                    alt="Profile" title={flaggedForumInfo?.user?.profile_img ? "" : "not found"} />
                            </figure>
                        </div>
                        <div className='post-desc'>
                            <h2 className='title'>{flaggedForumInfo?.user?.first_name} {" "} {flaggedForumInfo?.user?.last_name}</h2>
                            <span>{flaggedForumInfo?.forum_category_name}</span>
                            <span className='time'>{duration}</span>
                        </div>
                    </div>
                    <br />

                    <div className='funder-detail'>
                        <ul>
                            {flaggedForumInfo?.flagged_by?.length ?
                                <li>
                                    <span className='left'>Flagged By</span>
                                    <span className='right'>
                                        {flaggedForumInfo?.flagged_by?.length > 2 ?
                                            <textarea cols="42" rows="3" value={flaggedForumInfo?.flagged_by.map((item) => " " + item?.first_name + " " + item?.last_name)} disabled />
                                            :
                                            flaggedForumInfo?.flagged_by?.map((item, index) => <div key={index}>{item?.first_name + " " + item?.last_name}</div>)
                                        }
                                    </span>
                                </li>
                                : ""}
                            <li>
                                <span className='left'>Description</span>
                                <span className='right'>
                                    {flaggedForumInfo?.description?.length < 30 ?
                                        <div>{flaggedForumInfo?.description}</div>
                                        :
                                        <textarea cols="42" rows="3" value={flaggedForumInfo?.description} disabled />
                                    }
                                </span>
                            </li>
                        </ul>
                    </div>

                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{ clickable: true, }}
                        loop='true'
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {flaggedForumInfo?.forum_media?.map((item, index) => {
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
                        <span className='like'><LikeIcon />{flaggedForumInfo?.likes}</span>
                        {flaggedForumInfo?.comment === 0 ?
                            <span className='comment'><CommentIcon />{flaggedForumInfo?.comment}{" "}Comment</span>
                            :
                            <span className='comment' onClick={() => navigate(`/forums-management/all-forums/${flaggedForumInfo?.forum_id}/forum-comments`)} ><CommentIcon />{flaggedForumInfo?.comment}  {flaggedForumInfo?.comment <= 1 ? "Comment" : "Comments"}</span>
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

export default FlaggedForums