import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Button, Form, Input, Modal, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { PrefixSearch } from '../../svg';
import { searchData } from '../../actions/dashboard';
import { getStateList, addState, deleteState, getStateInfo, patchState, } from '../../actions/AppDataManagement/StateAction';

import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';

const ManageStates = () => {

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [stateId, setStateId] = useState();
  const [initialState, setInitialState] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  useEffect(() => {
    viewState()
  }, [stateId])


  //Listing
  const viewState = () => {
    dispatch(getStateList())
      .then((response) => { setInitialState(response?.data) })
      .catch((error) => error?.message)
  }


  // Searching
  const searchState = (value) => {
    const data = { search_data: value.trim(), modelname: "State", app_name: 'admin_app' }
    dispatch(searchData(data)).then(res => setInitialState(res.data)).catch(err => viewState())
  }


  //Add Modal
  const showAddModal = () => {
    setAddModalOpen(true)
  }

  const handleAddOk = (values) => {
    const data = { state_name: values.state_name }
    dispatch(addState(data))
      .then((response) => {
        toast.success(response?.message);
        form.resetFields();
        setAddModalOpen(false);
        viewState()
      }).catch((error) => toast.error(error?.message));
  }

  const handleAddCancel = () => { form.resetFields(); setAddModalOpen(false); }


  //Edit Modal
  const showEditModal = (record) => {
    setEditModalOpen(true)
    dispatch(getStateInfo(record?.id))
      .then((response) => {
        setStateId(record?.id)
        form.setFieldsValue({
          state_name: response?.data?.state_name,
        });
      })
  }

  const handleEditOk = (values) => {
    dispatch(patchState(stateId, values))
      .then((response) => {
        form?.resetFields();
        toast.success(response?.message);
        setEditModalOpen(false);
        viewState()
      }).catch((error) => toast.error(error?.message))
  }

  const handleEditCancel = () => { setEditModalOpen(false); form.resetFields(); }


  //Delete Modal
  const showDeleteModal = (record) => {
    setDeleteModalOpen(true);
    dispatch(getStateInfo(record?.id))
      .then((response) => {
        setStateId(record?.id)
      }).catch((error) => error?.message)
  }

  const handleDeleteOk = () => {
    dispatch(deleteState(stateId))
      .then((response) => {
        toast.success(response?.message)
        setDeleteModalOpen(false)
        viewState()
      }).catch((error) => toast.error(error?.message))
  }

  const handleDeleteCancel = () => setDeleteModalOpen(false);


  const columns = [
    {
      title: 'States',
      dataIndex: 'state_name',
      key: 'state_name',
      sorter: (a, b) => a?.state_name?.localeCompare(b?.state_name),
      render: (row, record) => <div>
        <div>{record?.state_name}</div>
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
            onChange={(e) => searchState(e.target.value)}
          />
        </div>
        <div className='btn-list'>
          <Button type="primary" htmlType="submit" onClick={showAddModal}>Add state</Button>
        </div>
      </div>

      {/* Table */}
      <Table
        bordered
        columns={columns}
        dataSource={initialState || []}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        scroll={{ x: 1200 }}
        className='check-pad-30'
      />


      {/* Add Modal */}
      <Modal
        title="Add State"
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
                name="state_name"
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
                    message: 'Please enter state'
                  },
                ]}>
                <Input placeholder="Add State" />
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
        title="Edit State"
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
                name="state_name"
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
                    message: 'Please enter state'
                  },
                ]}>
                <Input placeholder="Edit State" />
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

export default ManageStates;