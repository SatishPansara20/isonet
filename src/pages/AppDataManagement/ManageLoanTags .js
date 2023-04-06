import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Button, Form, Input, Modal, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { PrefixSearch } from '../../svg';
import { searchData } from '../../actions/dashboard';
import { addLoanTag, deleteLoanTag, getLoanTagInfo, getLoanTagList, patchLoanTag } from '../../actions/AppDataManagement/LoanTagAction';

import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';

const ManageLoanTags = () => {

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [tagId, setTagId] = useState();
  const [initialTag, setInitialTag] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  useEffect(() => {
    viewTags()
  }, [tagId])


  //Listing
  const viewTags = () => {
    dispatch(getLoanTagList())
      .then((response) => { setInitialTag(response?.data) })
      .catch((error) => error?.message)
  }

  // Searching
  const searchLoanTags = (value) => {
    const data = { search_data: value.trim(), modelname: "loantag", app_name: 'admin_app' }
    dispatch(searchData(data)).then(res => setInitialTag(res.data)).catch(err => viewTags())
  }


  //Add Modal
  const showAddModal = () => {
    setAddModalOpen(true)
  }

  const handleAddOk = (values) => {
    const data = { tag_name: values.tag_name }
    dispatch(addLoanTag(data))
      .then((response) => {
        toast.success(response?.message);
        form.resetFields();
        setAddModalOpen(false);
        viewTags()
      }).catch((error) => toast.error(error?.message));
  }

  const handleAddCancel = () => { form.resetFields(); setAddModalOpen(false); }


  //Edit Modal
  const showEditModal = (record) => {
    setEditModalOpen(true)
    dispatch(getLoanTagInfo(record?.id))
      .then((response) => {
        setTagId(record?.id)
        form.setFieldsValue({
          tag_name: response?.data?.tag_name,
        });
      })
  }

  const handleEditOk = (values) => {
    dispatch(patchLoanTag(tagId, values))
      .then((response) => {
        form?.resetFields();
        toast.success(response?.message);
        setEditModalOpen(false);
        viewTags()
      }).catch((error) => toast.error(error?.message))
  }

  const handleEditCancel = () => { setEditModalOpen(false); form.resetFields(); }


  //Delete Modal
  const showDeleteModal = (record) => {
    setDeleteModalOpen(true);
    dispatch(getLoanTagInfo(record?.id))
      .then((response) => {
        setTagId(record?.id)
      }).catch((error) => error?.message)
  }

  const handleDeleteOk = () => {
    dispatch(deleteLoanTag(tagId))
      .then((response) => {
        toast.success(response?.message)
        setDeleteModalOpen(false)
        viewTags()
      }).catch((error) => toast.error(error?.message))
  }

  const handleDeleteCancel = () => setDeleteModalOpen(false);



  const columns = [
    {
      title: 'Tag',
      dataIndex: 'tag_name',
      key: 'tag_name',
      sorter: (a, b) => a?.tag_name?.localeCompare(b?.tag_name),
      render: (row, record) => <div>
        <div>{record?.tag_name}</div>
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
            onChange={(e) => searchLoanTags(e.target.value)}
          />
        </div>
        <div className='btn-list'>
          <Button type="primary" htmlType="submit" onClick={showAddModal}>Add Tag</Button>
        </div>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={initialTag || []}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        scroll={{ x: 1200 }}
        className='check-pad-30'
      // onRow={(i) => ({ onClick: (e) => navigate('/funderlist') })}
      />

      {/* Add Modal */}
      <Modal
        title="Add Loan Tag"
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
                name="tag_name"
                rules={[
                  {
                    validator: (_, value) => {
                      if (value) {
                        if (/^[^\s].+[^\s]$/.test(value) && /^.{1,20}$/.test(value)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject('Please enter valid state');
                        }
                      } else {
                        return Promise.reject();
                      }
                    }
                  }, {
                    required: true,
                    message: 'Please enter tag'
                  },
                ]}>
                <Input placeholder="Add Loan Tag" />
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
        title="Edit Loan Tag"
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
                name="tag_name"
                rules={[
                  {
                    validator: (_, value) => {
                      if (value) {
                        if (/^[^\s].+[^\s]$/.test(value) && /^.{1,20}$/.test(value)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject('Please enter valid Loan Tag');
                        }
                      } else {
                        return Promise.reject();
                      }
                    }
                  }, {
                    required: true,
                    message: 'Please enter Loan Tag'
                  },
                ]}>
                <Input placeholder="Edit Loan Tag" />
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

export default ManageLoanTags;