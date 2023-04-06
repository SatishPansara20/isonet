import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
// import TextArea from 'antd/lib/input/TextArea';
import { Button, Space, Table, Modal, Form, Input } from 'antd'
import { EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { toAbsoluteUrl } from '../../utils'
// import { UploadFile } from '../../utils/UploadFile';
import { searchData } from '../../actions/dashboard';
import { PrefixSearch } from '../../svg';
import { formatPhoneNumber } from '../../utils/patterns';
import { getCompanyList, deleteCompany } from '../../actions/CompanyAction';

import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';


const CompanyManagement = () => {

  const dispatch = useDispatch();

  // const [form] = Form.useForm();
  const [companyId, setCompanyId] = useState();
  const [initialCompany, setInitialCompany] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewModalData, setViewModalData] = useState();
  // const [addModalOpen, setAddModalOpen] = useState(false);
  // const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  // const [fileUpload, setFileUpload] = useState();
  // const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    companyManagementListing()
  }, [companyId])


  //Listing
  const companyManagementListing = () => {
    dispatch(getCompanyList())
      .then((response) => { setInitialCompany(response?.data) })
      .catch((error) => error?.message)
  }



  // Searching
  const searchCompany = (value) => {
    const data = { search_data: value.trim(), modelname: "company", app_name: 'baseapp' }
    dispatch(searchData(data)).then(res => setInitialCompany(res?.data)).catch(err => companyManagementListing())
  }


  //View Modal
  const showViewModal = (record) => { setViewModalOpen(true); setViewModalData(record) }

  const handleViewCancel = () => { setViewModalOpen(false); }


  // Add Modal
  // const showAddModal = () => { setAddModalOpen(true); };

  // const handleAddOk = (values) => {
  //   const formData = new FormData();
  //   if (fileUpload) { formData.append("article_media", fileUpload) }
  //   formData.append("title", values.title)
  //   formData.append("author_name", values.author_name)
  //   formData.append("description", values.description)
  //   dispatch(addArticle(formData))
  //     .then((response) => {
  //       toast.success(response?.message)
  //       form.resetFields();
  //       setFileUpload();
  //       setImageUrl();
  //       setAddModalOpen(false);
  //       companyManagementListing();
  //     }).catch((error) => toast.error(error?.message))
  // };

  // const handleAddCancel = () => {
  //   setAddModalOpen(false);
  //   form.resetFields();
  //   setFileUpload();
  //   setImageUrl();
  // };


  // Edit Modal
  // const showEditModal = (record) => {
  //   setEditModalOpen(true)
  //   dispatch(getArticleInfo(record?.id))
  //     .then((response) => {
  //       setArticleId(record?.id)
  //       setImageUrl(response?.data?.article_media[0]?.article_media);
  //       form.setFieldsValue({
  //         title: response?.data?.title,
  //         author_name: response?.data?.author_name,
  //         description: response?.data?.description,
  //       });
  //     })
  // }

  // const handleEditOk = (values) => {
  //   const formData = new FormData();
  //   if (fileUpload) { formData.append("article_media", fileUpload) }
  //   formData.append("article_id", articleId);
  //   formData.append("title", values.title);
  //   formData.append("author_name", values.author_name);
  //   formData.append("description", values.description);
  //   dispatch(patchArticle(formData))
  //     .then((response) => {
  //       form.resetFields();
  //       setFileUpload();
  //       setImageUrl();
  //       toast.success(response?.message);
  //       setEditModalOpen(false);
  //       viewArticle();
  //     }).catch((error) => toast.error(error?.message))
  // }

  // const handleEditCancel = () => {
  //   form.resetFields();
  //   setFileUpload();
  //   setImageUrl();
  //   setEditModalOpen(false);
  // }


  //Delete Modal
  const showDeleteModal = (record) => { setDeleteModalOpen(true); setCompanyId(record?.id) }

  const handleDeleteOk = () => {
    dispatch(deleteCompany(companyId))
      .then((response) => {
        companyManagementListing()
        setDeleteModalOpen(false)
        toast.success(response?.message)
      }).catch((error) => toast.error(error?.message))
  }

  const handleDeleteCancel = () => setDeleteModalOpen(false);


  // Table Columns
  const columns = [
    {
      title: 'Company image',
      dataIndex: 'company_image',
      key: 'company_image',
      render: (row, record) => <div className='image'>
        <img src={record?.company_image ? record?.company_image : toAbsoluteUrl('/images/company_image.png')} alt="Company" title={record?.company_image ? "" : "not found"} />
      </div>
    },
    {
      title: 'Company name',
      dataIndex: 'company_name',
      key: 'company_name',
      sorter: (a, b) => a?.company_name?.localeCompare(b?.company_name),
      render: (row, record) => <div>
        <div>{record.company_name || "Company name not found"}</div>
      </div>
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a?.address?.localeCompare(b?.address),
      render: (row, record) => <div>
        <div> {record?.address.length > 30 ? record?.address.slice(0, 30) + "..." : record?.address}</div >
      </div>
    },
    {
      title: 'Phone number',
      dataIndex: 'phone_number',
      key: 'phone_number',
      sorter: (a, b) => a?.phone_number - b?.phone_number,
      render: (row, record) => <div>
        <div>{formatPhoneNumber(record.phone_number) || "Phone number not found"}</div>
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
          {/* <Button className='action-btn' icon={<EditOutlined />} onClick={() => showEditModal(record)} /> */}
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
            onChange={(e) => searchCompany(e.target.value)}
          />
        </div>
        {/* <div className='btn-list'>
          <Button type="primary" htmlType="submit" onClick={showAddModal}>Add Company</Button>
        </div> */}
      </div>


      {/* Table */}
      <Table
        bordered
        columns={columns}
        dataSource={initialCompany || []}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        scroll={{ x: 1200 }}
        className='check-pad-30'
      />


      {/* View Modal*/}
      <Modal
        title="Company Details"
        open={viewModalOpen}
        className='common-modal footer-none'
        width={650}
        centered
        onCancel={handleViewCancel}
      >
        <div className='funder-detail'>
          <div className='modal-image'>
            <img src={viewModalData?.company_image ? viewModalData?.company_image : toAbsoluteUrl('/images/company_image.png')} alt="Company" title={viewModalData?.company_image ? "" : "not found"} />
          </div>
          <ul>
            <li>
              <span className='left'>Company name</span>
              <span className='right'>{viewModalData?.company_name || "Name not found"}</span>
            </li>
            <li>
              <span className='left'>Address</span>
              <span className='right'>{viewModalData?.address || "Address not found"}</span>
            </li>
            <li>
              <span className='left'>Phone number</span>
              <span className='right' >{formatPhoneNumber(viewModalData?.phone_number) || "Phone number not found"}</span>
            </li>
            <li>
              <span className='left'>Description</span>
              <span className='right'>{viewModalData?.description || "Description not found"} </span>
            </li>
            <li>
              <span className='left'>Website</span>
              <span className='right'>
                {viewModalData?.website || "-"}
              </span>
            </li>
          </ul>
        </div>
      </Modal>


      {/* Add Modal */}
      {/* <Modal
        title="Add Company"
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
              </Space>
            </div>
          </div>
        </Form>
      </Modal> */}


      {/* Edit Modal */}
      {/* <Modal
        title="Edit Company"
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

export default CompanyManagement;