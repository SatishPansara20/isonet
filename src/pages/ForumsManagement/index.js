import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import moment from 'moment';
import { Pagination } from "swiper";
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Modal, Space, Table, Form, Input, Select } from 'antd'
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';

import { toAbsoluteUrl } from '../../utils';
import { searchData } from '../../actions/dashboard';
import { getCategoryList } from '../../actions/Category';
import { CommentIcon, LikeIcon, PrefixSearch } from '../../svg';
import { addForum, deleteForum, getForumInfo, getForumList, patchForum } from '../../actions/Forum';

import '../../utils/Upload.scss'
import '../PostManagement/Post.scss'
import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';



const AllForums = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { Option } = Select;

  const [form] = Form.useForm();
  const [forumId, setForumId] = useState();
  const [forumList, setForumList] = useState([]);
  const [forumInfo, setForumInfo] = useState({});
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryData, setCategoryData] = useState([])
  const [chooseCategory, setChooseCategory] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editOldImages, setEditOldImages] = useState([]);
  const [deleteImageArray, setDeleteImageArray] = useState([]);

  // count duration by date
  let duration = moment(forumInfo?.posted_at).fromNow();

  //Forum Listing
  useEffect(() => {
    viewAllForumList()
  }, [])


  //Listing
  const viewAllForumList = () => {
    dispatch(getForumList())
      .then((response) => { setForumList(response?.data) })
      .catch((error) => error?.message)
  }


  //Forum Searching
  const searchAllForum = (value) => {
    const data = { search_data: value.trim(), modelname: "forum", app_name: 'allpost' }
    dispatch(searchData(data)).then((res) => { setForumList(res?.data) }).catch(err => viewAllForumList())
  }


  // View Model start
  const showViewModal = (record) => {
    dispatch(getCategoryList())
      .then((response) => setCategoryData(response))
      .catch((error) => error?.message);

    setForumId(record?.form_id)

    const data = { forum_id: record?.forum_id }
    setViewModalOpen(true);
    dispatch(getForumInfo(data))
      .then((response) => { setForumId(response?.data?.forum_id); setForumInfo(response?.data) })
  };

  const handleViewCancel = () => { setViewModalOpen(false) };


  // Add Modal

  const onSelectFile = (event) => {
    let newFileArray = []
    let tmpFileArray = Object.values(event.target.files)
    for (let index = 0; index < tmpFileArray.length; index++) {
      const element = tmpFileArray[index];
      newFileArray = [...newFileArray, element]
    }
    setSelectedFiles([...selectedFiles, ...newFileArray])
  }

  const showAddModal = () => {
    dispatch(getCategoryList())
      .then((response) => {
        if (response?.status === 200) {
          setCategoryData(response)
          setAddModalOpen(true);
        }
      })
      .catch((error) => error?.message);
  };

  const handleAddOk = (values) => {
    const formData = new FormData();
    formData.append("feed_category_id", chooseCategory)
    formData.append("description", values.description)

    if (selectedFiles && selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        let forumMedia = selectedFiles[i];
        formData.append("forum_media", forumMedia);
      }
    }

    dispatch(addForum(formData))
      .then((response) => {
        if (response?.status === 200) {
          setAddModalOpen(false);
          toast.success(response?.message);
          setSelectedFiles([]);
          form.resetFields();
          viewAllForumList()
        }
      })
      .catch((error) => toast.error(error?.message))
  };

  const handleAddCancel = () => {
    setSelectedFiles([]);
    form.resetFields();
    setAddModalOpen(false);
  };


  // Edit Modal Start
  const showEditModal = (record) => {
    dispatch(getCategoryList()).then(res => setCategoryData(res));
    setForumId(record?.forum_id)
    const data = { forum_id: record?.forum_id }

    setEditModalOpen(true)
    dispatch(getForumInfo(data))
      .then((response) => {
        setForumInfo(response?.data)
        setEditOldImages(response.data.forum_media?.map((item) => item))
        form.setFieldsValue({ Category: response?.data?.forum_category_id, description: response?.data?.description, });
      })
  }

  const handleEditOk = (values) => {

    const formData = new FormData();
    formData.append("forum_id", forumId)
    formData.append("forum_category_id", chooseCategory || values?.Category)
    formData.append("description", values.description)

    if (selectedFiles && selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        let forumMedia = selectedFiles[i];
        formData.append("forum_media", forumMedia);
      }
    }

    if (deleteImageArray.length > 0) {
      for (let i = 0; i < deleteImageArray.length; i++) {
        let removeImageId = deleteImageArray[i];
        formData.append("remove_media", removeImageId);
      }
    }
    dispatch(patchForum(formData))
      .then((response) => {
        form?.resetFields();
        setSelectedFiles([])
        setDeleteImageArray([])
        setEditModalOpen(false);
        toast.success(response?.message);
        viewAllForumList();
      }).catch((error) => toast.error(error?.message))
  }

  const handleEditCancel = () => {
    form.resetFields();
    setSelectedFiles([])
    setDeleteImageArray([])
    setEditModalOpen(false)
  }


  //Delete Model start
  const showDeleteModal = (record) => { setDeleteModalOpen(true); setForumId(record?.forum_id) }

  const handleDeleteOk = () => {
    const data = { forum_id: forumId }
    dispatch(deleteForum(data))
      .then((response) => {
        toast.success(response?.message)
        setDeleteModalOpen(false)
        viewAllForumList()
      }).catch((error) => toast.error(error?.message))
  }

  const handleDeleteCancel = () => setDeleteModalOpen(false);

  const selectCategory = (value) => { setChooseCategory(value) }

  const handleDeleteOldImage = (data) => {
    setEditOldImages(editOldImages?.filter(val => val?.id !== data?.id) || [])
    setDeleteImageArray([...deleteImageArray, data?.id])
  }

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
        <div>{record?.user?.first_name}{" "}{record?.user?.last_name}</div>
      </div>
    },
    {
      title: 'Category',
      dataIndex: 'forum_category_name',
      key: 'forum_category_name',
      sorter: (a, b) => a?.forum_category_name?.localeCompare(b?.forum_category_name),
      render: (row, record) => <div>
        <div>{record?.forum_category_name}</div>
      </div>
    },
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
          <Button className='action-btn' icon={<EditOutlined />} onClick={() => showEditModal(record)} />
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
            onChange={(e) => searchAllForum(e.target.value)}
          />
        </div>
        <div className='btn-list'>
          <Button type="primary" htmlType="submit" onClick={showAddModal}>Add Forum</Button>
        </div>
      </div>

      {/* Table */}
      <Table
        bordered
        columns={columns}
        dataSource={forumList || []}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        scroll={{ x: 1200 }}
        className='check-pad-30'
      />


      {/* View Modal */}
      <Modal
        title="Forum Details"
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
                <img src={forumInfo?.user?.profile_img ? forumInfo?.user?.profile_img : toAbsoluteUrl('/images/user-img.svg')}
                  alt="Profile" title={forumInfo?.user?.profile_img ? "" : "not found"} />
              </figure>
            </div>
            <div className='post-desc'>
              <h2 className='title'>{forumInfo?.user?.first_name} {" "} {forumInfo?.user?.last_name}</h2>
              <span>{forumInfo?.forum_category_name}</span>
              <span className='time'>{duration}</span>
            </div>
          </div>
          <br />

          <div className='funder-detail'>
            <ul>
              <li>
                <span className='left'>Description</span>
                <span className='right'>
                  {forumInfo?.description?.length < 30 ?
                    <div>{forumInfo?.description}</div>
                    :
                    <textarea cols="42" rows="3" value={forumInfo?.description} disabled />
                  }
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
            {forumInfo?.forum_media?.map(item => {
              return (
                <SwiperSlide>
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
            <span className='like'><LikeIcon />{forumInfo?.likes}</span>
            {forumInfo?.comment === 0 ?
              <span className='comment'><CommentIcon />{forumInfo?.comment}{" "}Comment</span>
              :
              <span className='comment' onClick={() => navigate(`/forums-management/all-forums/${forumInfo?.forum_id}/forum-comments`)} ><CommentIcon />{forumInfo?.comment}  {forumInfo?.comment <= 1 ? "Comment" : "Comments"}</span>
            }
          </div>
        </div>
      </Modal>


      {/* Add Modal */}
      <Modal
        title="Add Forum"
        open={addModalOpen}
        className='centered-text'
        width={650}
        centered
        onOk={form.submit}
        onCancel={handleAddCancel}
        footer={[]}
      >

        <Form form={form} onFinish={handleAddOk}>
          <div className='row'>
            <div className='col-sm-12'>

              <Form.Item
                className='form-group'
                name="forum_media"
                rules={[{ required: true, message: 'Please choose Image' }]}
              >
                <div className='upload-wrapper'>
                  <div className='upload-ui' style={{ width: "100px", height: "100px", }}>
                    <span className='upload-span'><img src={toAbsoluteUrl('/images/upload-icon.svg')} alt="Upload" /><br />Upload</span>
                    <Input type='file' name='images' onChange={onSelectFile} multiple accept={"image/*, video/*"} />
                  </div>

                  {selectedFiles?.map((image, index) => (
                    <div key={index} className='upload-mul'>
                      {image?.type?.startsWith("image") ?
                        <a href={URL.createObjectURL(image)} alt="" target="_blank" rel="noreferrer">
                          <img src={URL.createObjectURL(image)} alt="Upload" />
                        </a> :
                        <a href={URL.createObjectURL(image)} alt="Upload" target="_blank" rel="noreferrer">
                          <video>
                            <source src={URL.createObjectURL(image)} />
                          </video>
                        </a>
                      }
                      <button type="button" onClick={() => setSelectedFiles(selectedFiles.filter((e, i) => i !== index))}><DeleteOutlined /></button>
                    </div>
                  ))}

                </div>
              </Form.Item>

              <Form.Item
                className='form-group'
                name="Category"
                rules={[{ required: true, message: 'Please choose Category' }]}
              >
                <Select
                  placeholder="Select a Category"
                  onChange={selectCategory}
                  allowClear >
                  {categoryData?.data?.map((item) => {
                    return (
                      <Option value={item?.id}>{item?.category_name}</Option>
                    )
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                className='form-group'
                name="description"
                rules={[{ required: true, message: 'Please enter description' }]}
              >
                <Input placeholder="Description" />
              </Form.Item>

              <Space size={10}>
                <Button type="default" onClick={handleAddCancel}>Cancel</Button>
                <Button type="primary" htmlType='submit'>Submit</Button>
              </Space>
            </div>
          </div>
        </Form>
      </Modal>


      {/* Edit Modal */}
      <Modal
        title="Edit Forum"
        open={editModalOpen}
        className='centered-text'
        width={650}
        centered
        onOk={form.submit}
        onCancel={handleEditCancel}
        footer={[]}
      >
        <Form form={form} onFinish={handleEditOk}>
          <div className='row'>
            <div className='col-sm-12'>

              <div className='upload-wrapper'>
                <div className='upload-ui' style={{ width: "100px", height: "100px", }}>
                  <span className='upload-span'><img src={toAbsoluteUrl('/images/upload-icon.svg')} alt="" /><br />Upload</span>
                  <Input type='file' name='images' onChange={onSelectFile} multiple accept={"image/*, video/*"} />
                </div>

                {(editOldImages?.map((image, index) => (
                  <div key={index} className='upload-mul'>
                    {image.media_type === "image" ?
                      <a href={image?.forum_media} target="_blank" rel="noreferrer">
                        <img src={image?.forum_media} alt="Media" />
                      </a>
                      :
                      <a href={image?.forum_media} target="_blank" rel="noreferrer">
                        <video poster={image?.thumbnail}>
                          <source src={image?.forum_media} />
                        </video>
                      </a>
                    }
                    <button type='button' onClick={() => handleDeleteOldImage(image)}><DeleteOutlined /></button>
                  </div>
                )))}

                {(selectedFiles?.map((image, index) => (
                  <div key={index} className='upload-mul'>
                    {image?.type?.startsWith("image") ?
                      <a href={URL.createObjectURL(image)} alt="" target="_blank" rel="noreferrer">
                        <img src={URL.createObjectURL(image)} alt="Upload" />
                      </a> :
                      <a href={URL.createObjectURL(image)} alt="" target="_blank" rel="noreferrer">
                        <video>
                          <source src={URL.createObjectURL(image)} />
                        </video>
                      </a>
                    }
                    <button type="button" onClick={() => setSelectedFiles(selectedFiles.filter((e, i) => i !== index))}><DeleteOutlined /></button>
                  </div>
                )))}

              </div>
              <br />

              <Form.Item
                className='form-group'
                name="Category"
                rules={[{ required: true, message: 'Please choose Category' }]}
              >
                <Select
                  name="Category"
                  placeholder="Select a Category"
                  onChange={selectCategory}
                  allowClear >
                  {categoryData?.data?.map((item) => { return (<Option value={item?.id}>{item?.category_name}</Option>) })}
                </Select>
              </Form.Item>
              <Form.Item
                className='form-group'
                name="description"
                rules={[{ required: true, message: 'Please enter description' }]}
              >
                <Input placeholder="Description" />
              </Form.Item>

              <Space size={10}>
                <Button type="default" onClick={handleEditCancel}>Cancel</Button>
                <Button type="primary" htmlType='submit'>Submit</Button>
              </Space>
            </div>
          </div>
        </Form>
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

export default AllForums;