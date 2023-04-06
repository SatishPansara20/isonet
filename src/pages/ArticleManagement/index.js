import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { toast } from 'react-toastify';
import TextArea from 'antd/lib/input/TextArea';
import { Button, Form, Input, Modal, Space, Table } from 'antd'
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';

import { toAbsoluteUrl } from '../../utils';
import { UploadFile } from '../../utils/UploadFile'
import { searchData } from '../../actions/dashboard';
import { CommentIcon, LikeIcon, PrefixSearch } from '../../svg';
import { addArticle, deleteArticle, getArticleInfo, getArticleList, patchArticle } from '../../actions/ArticleManagement';

import '../PostManagement/Post.scss'
import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';


const AllArticles = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [articleId, setArticleId] = useState();
  const [initialArticle, setInitialArticle] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [fileUpload, setFileUpload] = useState();
  const [imageUrl, setImageUrl] = useState();


  useEffect(() => {
    viewArticle()
  }, [])


  //Listing
  const viewArticle = () => {
    dispatch(getArticleList())
      .then((response) => { setInitialArticle(response?.data) })
      .catch((error) => error?.message)
  }


  //Searching
  const searchArticle = (value) => {
    const data = { search_data: value.trim(), modelname: "article", app_name: 'allpost' }
    dispatch(searchData(data)).then(res => setInitialArticle(res.data)).catch(err => viewArticle())
  }


  // View Modal
  const showViewModal = (record) => { setViewModalOpen(true); setArticleId(record) };

  const handleViewCancel = () => { setViewModalOpen(false); };


  // Add Modal
  const showAddModal = () => { setAddModalOpen(true); };

  const handleAddOk = (values) => {
    const formData = new FormData();
    if (fileUpload) { formData.append("article_media", fileUpload) }
    formData.append("title", values.title)
    formData.append("author_name", values.author_name)
    formData.append("description", values.description)
    dispatch(addArticle(formData))
      .then((response) => {
        toast.success(response?.message)
        form.resetFields();
        setFileUpload();
        setImageUrl();
        setAddModalOpen(false);
        viewArticle();
      }).catch((error) => toast.error(error?.message))
  };

  const handleAddCancel = () => {
    setAddModalOpen(false);
    form.resetFields();
    setFileUpload();
    setImageUrl();
  };


  // Edit Modal
  const showEditModal = (record) => {
    setEditModalOpen(true)
    dispatch(getArticleInfo(record?.id))
      .then((response) => {
        setArticleId(record?.id)
        setImageUrl(response?.data?.article_media[0]?.article_media);
        form.setFieldsValue({
          title: response?.data?.title,
          author_name: response?.data?.author_name,
          description: response?.data?.description,
        });
      })
  }

  const handleEditOk = (values) => {
    const formData = new FormData();
    if (fileUpload) { formData.append("article_media", fileUpload) }
    formData.append("article_id", articleId);
    formData.append("title", values.title);
    formData.append("author_name", values.author_name);
    formData.append("description", values.description);
    dispatch(patchArticle(formData))
      .then((response) => {
        form.resetFields();
        setFileUpload();
        setImageUrl();
        toast.success(response?.message);
        setEditModalOpen(false);
        viewArticle();
      }).catch((error) => toast.error(error?.message))
  }

  const handleEditCancel = () => {
    form.resetFields();
    setFileUpload();
    setImageUrl();
    setEditModalOpen(false);
  }


  //Delete Modal 
  const showDeleteModal = (record) => {
    setDeleteModalOpen(true);
    dispatch(getArticleInfo(record))
      .then((response) => { setArticleId(response?.data?.id) })
      .catch((error) => error?.message)
  }

  const handleDeleteOk = () => {
    dispatch(deleteArticle(articleId))
      .then((response) => {
        toast.success(response?.message)
        setDeleteModalOpen(false)
        viewArticle()
      }).catch((error) => toast.error(error?.message))
  }

  const handleDeleteCancel = () => setDeleteModalOpen(false);


  // Table Columns
  const columns = [
    {
      title: 'Article image',
      dataIndex: 'image',
      key: 'image',
      render: (row, record) => (
        <>
          {record?.article_media?.map((item, index) => (
            <div key={index} className='image' >
              <img src={item?.article_media ? item?.article_media : toAbsoluteUrl('/images/logo-icon.svg')} alt="Article" title={item?.article_media ? "" : "not found"} />
            </div>
          ))}
        </>
      )
    },
    {
      title: 'Author name',
      dataIndex: 'author_name',
      key: 'author_name',
      sorter: (a, b) => a?.author_name?.localeCompare(b?.author_name),
      render: (row, record) => <div>
        <div>{record?.author_name}</div>
      </div>
    },
    {
      title: 'Articles name',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a?.title?.localeCompare(b?.title),
      render: (row, record) => <div>
        <div>{record?.title.length > 20 ? record?.title.slice(0, 30) + "..." : record?.title}</div>
      </div>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',

      sorter: (a, b) => a?.description?.localeCompare(b?.description),
      render: (row, record) => <div>
        <div>{record?.description.length > 30 ? record?.description.slice(0, 30) + "..." : record?.description}</div>
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
            onChange={(e) => searchArticle(e.target.value)}
          />
        </div>
        <div className='btn-list'>
          <Button type="primary" htmlType="submit" onClick={showAddModal}> Add Article</Button>
        </div>
      </div>

      {/* Table */}
      <Table
        bordered
        columns={columns}
        dataSource={initialArticle || []}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        scroll={{ x: 1200 }}
        className='check-pad-30'
      />


      {/* View Modal */}
      <Modal
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
              <span className='right'>{articleId?.title}</span>
            </li>
            <li>
              <span className='left'>Author name</span>
              <span className='right'>{articleId?.author_name}</span>
            </li>
            <li>
              <span className='left'>Description</span>
              <span className='right'>
                {articleId?.description?.length < 30 ?
                  <div>{articleId?.description}</div>
                  :
                  <textarea cols="38" rows="3" value={articleId?.description} disabled />
                }
              </span>
            </li>
            <br />
            <div className='post-image'>
              {articleId?.article_media?.map((item, index) => {
                return (
                  <a key={index} href={item?.article_media} target="_blank" rel='noreferrer'>
                    <img src={item?.article_media ? item?.article_media : toAbsoluteUrl('/images/logo-icon.svg')} title={item?.article_media ? "" : "not found"} alt="Article" width={450} height={250} />
                  </a>
                )
              })}
            </div>
            <div className='post-detail'>
              <div className='footer-post'>
                <span className='like'><LikeIcon />{articleId?.likes}</span>
                {articleId?.comment === 0 ?
                  <span className='comment'><CommentIcon />{articleId?.comment}{" "}Comment</span>
                  :
                  <span className='comment' onClick={() => navigate(`/article-management/all-article/${articleId?.id}/article-comments`)} ><CommentIcon />{articleId?.comment}  {articleId?.comment <= 1 ? "Comment" : "Comments"}</span>
                }
              </div>
            </div>
          </ul>
        </div>
      </Modal>


      {/* Add Modal */}
      <Modal
        title="Add Article"
        open={addModalOpen}
        className='centered-text'
        width={650}
        centered
        onOk={form.submit}
        onCancel={handleAddCancel}
        footer={[

        ]}
      >
        <Form form={form} onFinish={handleAddOk}>
          <div className='row'>
            <div className='col-sm-12'>

              <UploadFile
                accept={"image/*"}
                uploadText={"Upload Image"}
                uploadWidth={"120px"}
                uploadHeight={"120px"}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                setFileUpload={setFileUpload}
                fileUpload={fileUpload}
              />
              <br />

              <Form.Item
                className='form-group'
                name="title"
                rules={[{ required: true, message: 'Please enter title' }]}
              >
                <Input placeholder="Title" />
              </Form.Item>

              <Form.Item
                className='form-group'
                name="author_name"
                rules={[{ required: true, message: 'Please enter author name' }]}
              >
                <Input placeholder="Author name" />
              </Form.Item>

              <Form.Item
                className='form-group'
                name="description"
                rules={[{ required: true, message: 'Please enter description!' }]}
              >
                <TextArea cols={80} placeholder="Description" />
              </Form.Item>

              <br />
              <Space size={10}>
                <Button type="default" onClick={handleAddCancel}>Cancel</Button>
                <Button type="primary" htmlType='submit' >Submit</Button>
                {/* {!fileUpload ?
                  <Button type="primary" htmlType='submit' disabled title='Please Choose Image'>Submit</Button>
                  :
                  <Button type="primary" htmlType='submit' >Submit</Button>
                } */}
              </Space>

            </div>
          </div>
        </Form>
      </Modal>


      {/* Edit Modal */}
      <Modal
        title="Edit Article"
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

              <UploadFile
                uploadText={"Upload Image"}
                accept={"image/*"}
                uploadWidth={"120px"}
                uploadHeight={"120px"}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                setFileUpload={setFileUpload}
              />
              <br />

              <Form.Item
                className='form-group'
                name="title"
                rules={[{ required: true, message: 'Please enter title' }]}
              >
                <Input placeholder="Title" />
              </Form.Item>

              <Form.Item
                className='form-group'
                name="author_name"
                rules={[{ required: true, message: 'Please enter author name' }]}
              >
                <Input placeholder="Author name" />
              </Form.Item>

              <Form.Item
                className='form-group'
                name="description"
                rules={[{ required: true, message: 'Please enter description!' }]}
              >
                <TextArea cols={80} rows={5} placeholder="Description" />
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

export default AllArticles;