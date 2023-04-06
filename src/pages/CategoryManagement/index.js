import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Button, Form, Input, Modal, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { PrefixSearch } from '../../svg';
import { searchData } from '../../actions/dashboard';
import { addCategory, deleteCategory, getCategoryInfo, getCategoryList, patchCategory } from '../../actions/Category';

import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';


const CategoryManagement = () => {

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [categoryId, setCategoryId] = useState();
  const [initialCategory, setInitialCategory] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  useEffect(() => {
    viewCategoryListing()
  }, [categoryId])


  //Listing
  const viewCategoryListing = () => {
    dispatch(getCategoryList())
      .then((response) => { setInitialCategory(response?.data) })
      .catch((error) => error?.message)
  }


  // Searching
  const searchCategory = (value) => {
    const data = { search_data: value.trim(), modelname: "FeedCategory", app_name: 'allpost' }
    dispatch(searchData(data)).then(res => setInitialCategory(res.data)).catch(err => viewCategoryListing())
  }


  // Add Modal
  const showAddModal = () => { setAddModalOpen(true) };

  const handleAddOk = (values) => {
    const data = { category_name: values.category_name }
    dispatch(addCategory(data))
      .then((response) => {
        toast.success(response?.message);
        form.resetFields();
        setAddModalOpen(false);
        viewCategoryListing();
      }).catch((error) => toast.error(error?.message));
  };

  const handleAddCancel = () => { form.resetFields(); setAddModalOpen(false); };


  // Edit Modal
  const showEditModal = (record) => {
    setEditModalOpen(true);
    dispatch(getCategoryInfo(record?.id))
      .then((response) => {
        setCategoryId(record?.id)
        form.setFieldsValue({ category_name: response?.data?.category_name, });
      })
  };

  const handleEditOk = (values) => {
    dispatch(patchCategory(categoryId, values))
      .then((response) => {
        toast.success(response?.message);
        form?.resetFields();
        setEditModalOpen(false);
        viewCategoryListing();
      }).catch((error) => toast.error(error?.message))
  };

  const handleEditCancel = () => { setEditModalOpen(false); form.resetFields(); };


  //Delete Modal
  const showDeleteModal = (record) => {
    setDeleteModalOpen(true);
    dispatch(getCategoryInfo(record?.id))
      .then((response) => { setCategoryId(record?.id) })
      .catch((error) => error?.message)
  }

  const handleDeleteOk = () => {
    dispatch(deleteCategory(categoryId))
      .then((response) => {
        toast.success(response?.message)
        setDeleteModalOpen(false)
        viewCategoryListing()
      }).catch((error) => toast.error(error?.message))
  }

  const handleDeleteCancel = () => setDeleteModalOpen(false);


  // Table Columns
  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'category_name',
      key: 'category_name',
      sorter: (a, b) => a?.category_name?.localeCompare(b?.category_name),
      render: (row, record) => <div>
        <div>{record?.category_name}</div>
      </div>
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      className: 'action',
      render: (row, record) =>
        <Space>
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
            onChange={(e) => searchCategory(e.target.value)}
          />
        </div>
        <div className='btn-list'>
          <Button type="primary" htmlType="submit" onClick={showAddModal}>Add Category</Button>
        </div>
      </div>


      {/* Table */}
      <Table
        bordered
        columns={columns}
        dataSource={initialCategory || []}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        scroll={{ x: 1200 }}
        className='check-pad-30'
      />

      {/* Add Modal */}
      <Modal
        title="Add Category"
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
                name="category_name"
                rules={[
                  {
                    validator: (_, value) => {
                      if (value) {
                        if (/^[^\s].+[^\s]$/.test(value) && /^.{1,50}$/.test(value)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject('Please enter valid category');
                        }
                      } else {
                        return Promise.reject();
                      }
                    }
                  }, {
                    required: true,
                    message: 'Please enter category'
                  }
                ]}>
                <Input placeholder="Add" />
              </Form.Item>
              <br />
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
        title="Edit Category"
        open={editModalOpen}
        width={650}
        centered
        onOk={form.submit}
        onCancel={handleEditCancel}
        footer={[]}
      >
        <Form form={form} onFinish={handleEditOk}>
          <div className='row'>
            <div className='col-sm-12'>
              <Form.Item
                className='form-group'
                name="category_name"
                rules={[
                  {
                    validator: (_, value) => {
                      if (value) {
                        if (/^[^\s].+[^\s]$/.test(value) && /^.{1,50}$/.test(value)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject('Please enter valid category');
                        }
                      } else {
                        return Promise.reject();
                      }
                    }
                  }, {
                    required: true,
                    message: 'Please enter category'
                  }
                ]}
              >
                <Input placeholder="Edit" />
              </Form.Item>
              <br />
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

export default CategoryManagement;