import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Button, Form, Input, Modal, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { PrefixSearch } from '../../svg';
import { searchData } from '../../actions/dashboard';
import { getIndustriesList, deleteIndustries, addIndustries, getIndustriesInfo, patchIndustries, } from '../../actions/AppDataManagement/IndustriesAction';

import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';

const ManageIndustries = () => {

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [industryId, setIndustryId] = useState();
  const [initialIndustry, setInitialIndustry] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  useEffect(() => {
    viewIndustry()
  }, [industryId])


  //Listing
  const viewIndustry = () => {
    dispatch(getIndustriesList())
      .then((response) => { setInitialIndustry(response?.data) })
      .catch((error) => error?.message)
  }

  // Searching
  const searchIndustry = (value) => {
    const data = { search_data: value.trim(), modelname: "Industries", app_name: 'admin_app' }
    dispatch(searchData(data)).then(res => setInitialIndustry(res.data)).catch(err => viewIndustry())
  }


  //Add Modal
  const showAddModal = () => { setAddModalOpen(true) }

  const handleAddOk = (values) => {
    const data = { industry_name: values.industry_name }
    dispatch(addIndustries(data))
      .then((response) => {
        toast.success(response?.message);
        form.resetFields();
        setAddModalOpen(false);
        viewIndustry()
      }).catch((error) => toast.error(error?.message));
  }

  const handleAddCancel = () => { form.resetFields(); setAddModalOpen(false); }


  //Edit Modal
  const showEditModal = (record) => {
    setEditModalOpen(true)
    dispatch(getIndustriesInfo(record?.id))
      .then((response) => {
        setIndustryId(record?.id)
        form.setFieldsValue({
          industry_name: response?.data?.industry_name,
        });
      })
  }

  const handleEditOk = (values) => {
    dispatch(patchIndustries(industryId, values))
      .then((response) => {
        form?.resetFields();
        toast.success(response?.message);
        setEditModalOpen(false);
        viewIndustry();
      }).catch((error) => toast.error(error?.message))
  }

  const handleEditCancel = () => { setEditModalOpen(false); form.resetFields(); }


  //Delete Modal
  const showDeleteModal = (record) => {
    setDeleteModalOpen(true);
    dispatch(getIndustriesInfo(record?.id))
      .then((response) => {
        setIndustryId(record?.id)
      }).catch((error) => error?.message)
  }

  const handleDeleteOk = () => {
    dispatch(deleteIndustries(industryId))
      .then((response) => {
        toast.success(response?.message)
        setDeleteModalOpen(false)
        viewIndustry()
      }).catch((error) => toast.error(error?.message))
  }

  const handleDeleteCancel = () => setDeleteModalOpen(false);



  const columns = [
    {
      title: 'Industry',
      dataIndex: 'industry_name',
      key: 'industry_name',
      sorter: (a, b) => a?.industry_name?.localeCompare(b?.industry_name),
      render: (row, record) => <div>
        <div>{record?.industry_name}</div>
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
            onChange={(e) => searchIndustry(e.target.value)}
          />
        </div>
        <div className='btn-list'>
          <Button type="primary" htmlType="submit" onClick={showAddModal}>Add Industry</Button>
        </div>
      </div>


      {/* Table */}
      <Table
        bordered
        columns={columns}
        dataSource={initialIndustry || []}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        scroll={{ x: 1200 }}
        className='check-pad-30'
      />


      {/* Add Modal */}
      <Modal
        title="Add Industry"
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
                name="industry_name"
                rules={[
                  {
                    validator: (_, value) => {
                      if (value) {
                        if (/^[^\s].+[^\s]$/.test(value) && /^.{1,50}$/.test(value)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject('Please enter valid industry');
                        }
                      } else {
                        return Promise.reject();
                      }
                    }
                  }, {
                    required: true,
                    message: 'Please enter industry'
                  }
                ]}>
                <Input placeholder="Add Industry" />
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
        title="Edit Industry"
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
                name="industry_name"
                rules={[
                  {
                    validator: (_, value) => {
                      if (value) {
                        if (/^[^\s].+[^\s]$/.test(value) && /^.{1,50}$/.test(value)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject('Please enter valid industry');
                        }
                      } else {
                        return Promise.reject();
                      }
                    }
                  }, {
                    required: true,
                    message: 'Please enter industry'
                  }
                ]}>
                <Input placeholder="Edit Industry" />
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

export default ManageIndustries;