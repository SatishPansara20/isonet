import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Button, Form, Input, Modal, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { PrefixSearch } from '../../svg';
import { searchData } from '../../actions/dashboard';
import { getInterestList, deleteInterest, addInterest, patchInterest, getInterestInfo, } from '../../actions/AppDataManagement/InterestsAction';

import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';

const InterestsManagement = () => {

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [initialInterest, setInitialInterest] = useState([]);
  const [interestId, setInterestId] = useState();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  useEffect(() => {
    viewInterst()
  }, [interestId])

  //View All Records
  const viewInterst = () => {
    dispatch(getInterestList())
      .then((response) => {
        setInitialInterest(response?.data)
      }).catch((error) => error?.message)
  }

  //Add Modal
  const showAddModal = () => {
    setAddModalOpen(true)
  }

  const handleAddOk = (values) => {
    const data = { tag_name: values.tag_name }
    dispatch(addInterest(data))
      .then((response) => {
        toast.success(response?.message);
        form.resetFields();
        setAddModalOpen(false);
        viewInterst()
      }).catch((error) => toast.error(error?.message));
  }

  const handleAddCancel = () => {
    form.resetFields();
    setAddModalOpen(false);
  }


  //Edit Modal 
  const showEditModal = (record) => {
    setEditModalOpen(true)
    dispatch(getInterestInfo(record?.pk))
      .then((response) => {
        setInterestId(record?.pk)
        form.setFieldsValue({
          tag_name: response?.data?.tag_name,
        });
      })
  }

  const handleEditOk = (values) => {
    dispatch(patchInterest(interestId, values))
      .then((response) => {
        form?.resetFields();
        toast.success(response?.message);
        setEditModalOpen(false);
        viewInterst();
      }).catch((error) => toast.error(error?.message))
  }

  const handleEditCancel = () => {
    setEditModalOpen(false)
    form.resetFields();
  }



  //Delete Modal
  const showDeleteModal = (record) => {
    setDeleteModalOpen(true);
    dispatch(getInterestInfo(record?.pk))
      .then((response) => {
        setInterestId(record?.pk)
      }).catch((error) => error?.message)
  }

  const handleDeleteOk = () => {
    dispatch(deleteInterest(interestId))
      .then((response) => {
        toast.success(response?.message)
        setDeleteModalOpen(false)
        viewInterst()
      }).catch((error) => toast.error(error?.message))
  }

  const handleDeleteCancel = () => setDeleteModalOpen(false);


  const changeInterst = (value) => {
    const data = {
      search_data: value.trim(),
      modelname: "tag",
      app_name: 'admin_app'
    }
    dispatch(searchData(data)).then(res => setInitialInterest(res?.data)).catch(err => viewInterst())
  }


  const columns = [
    {
      title: 'Interest',
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
            onChange={(e) => changeInterst(e.target.value)}
          />
        </div>
        <div className='btn-list'>
          <Button type="primary" htmlType="submit" onClick={showAddModal}>Add Interest</Button>
        </div>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={initialInterest || []}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        scroll={{ x: 1200 }}
        className='check-pad-30'
      />

      {/* Add Modal */}
      <Modal
        title="Add Interest"
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
                          return Promise.reject('Please enter valid interest');
                        }
                      } else {
                        return Promise.reject();
                      }
                    }
                  }, {
                    required: true,
                    message: 'Please enter interest'
                  },
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
        title="Edit Interest"
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
                          return Promise.reject('Please enter valid interest');
                        }
                      } else {
                        return Promise.reject();
                      }
                    }
                  }, {
                    required: true,
                    message: 'Please enter interest'
                  },
                ]}>
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

export default InterestsManagement;
