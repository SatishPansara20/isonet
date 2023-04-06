import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Button, Form, Input, Modal, Select, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { PrefixSearch } from '../../svg';
import patterns from '../../utils/patterns';
import { searchData } from '../../actions/dashboard';
import { addTermLength, deleteTermLength, getTermLengthInfo, patchTermLength, getTermLengthList, } from '../../actions/AppDataManagement/TermLengthAction';

import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';


const ManageTermLength = () => {

  const dispatch = useDispatch();

  const { Option } = Select;

  const [form] = Form.useForm();
  const [termId, setTermId] = useState();
  const [initialTerm, setTerm] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  useEffect(() => {
    viewTerm()
  }, [termId])


  //Listing
  const viewTerm = () => {
    dispatch(getTermLengthList())
      .then((response) => { setTerm(response?.data) })
      .catch((error) => error?.message)
  }


  // Searching
  const searchTerm = (value) => {
    const data = { search_data: value.trim(), modelname: "TermLength", app_name: 'admin_app' }
    dispatch(searchData(data)).then(res => setTerm(res.data)).catch(err => viewTerm())
  }


  //Add Modal
  const showAddModal = () => { setAddModalOpen(true) }

  const handleAddOk = (values) => {
    const data = { max_term: values.max_term, type: values.type, }
    dispatch(addTermLength(data))
      .then((response) => {
        toast.success(response?.message);
        form.resetFields();
        setAddModalOpen(false);
        viewTerm()
      }).catch((error) => toast.error(error?.message));
  }

  const handleAddCancel = () => { form.resetFields(); setAddModalOpen(false); }


  //Edit Modal
  const showEditModal = (record) => {
    setEditModalOpen(true)
    dispatch(getTermLengthInfo(record?.id))
      .then((response) => {
        setTermId(record?.id)
        form.setFieldsValue({
          max_term: response?.data?.max_term,
          type: response?.data?.type,
        });
      })
  }

  const handleEditOk = (values) => {
    dispatch(patchTermLength(termId, values))
      .then((response) => {
        form?.resetFields();
        toast.success(response?.message);
        setEditModalOpen(false);
        viewTerm()
      }).catch((error) => toast.error(error?.message))
  }

  const handleEditCancel = () => { setEditModalOpen(false); form.resetFields(); }


  //Delete Modal
  const showDeleteModal = (record) => {
    setDeleteModalOpen(true);
    dispatch(getTermLengthInfo(record?.id))
      .then((response) => {
        setTermId(record?.id)
      }).catch((error) => error?.message)
  }

  const handleDeleteOk = () => {
    dispatch(deleteTermLength(termId))
      .then((response) => {
        toast.success(response?.message)
        setDeleteModalOpen(false)
        viewTerm()
      }).catch((error) => toast.error(error?.message))
  }

  const handleDeleteCancel = () => setDeleteModalOpen(false);


  // Table Columns
  const columns = [
    {
      title: 'Term Length',
      dataIndex: 'max_term',
      key: 'max_term',
      render: (row, record) =>
        <div>
          {record?.max_term} {record?.type === "MO" && record?.max_term > 1 ? "Months" : record?.type === "MO" && record?.max_term === 1 ? 'Month' : record?.type === "YR" && record?.max_term > 1 ? 'Years' : 'Year'}
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
            onChange={(e) => searchTerm(e.target.value)}
          />
        </div>
        <div className='btn-list'>
          <Button type="primary" htmlType="submit" onClick={showAddModal}>Add Term</Button>
        </div>
      </div>

      {/* Table */}
      <Table
        bordered
        columns={columns}
        dataSource={initialTerm || []}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        scroll={{ x: 1200 }}
        className='check-pad-30'
      />


      {/* Add Modal */}
      <Modal
        title="Add Term"
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
                name="max_term"
                rules={[
                  { required: true, message: 'Please enter term' },
                  { pattern: patterns.integer, message: 'Please enter valid term' }]}>
                <Input placeholder="Add" />
              </Form.Item>

              <Form.Item
                className='form-group'
                name="type"
              >
                <Select placeholder="Month / Year">
                  <Option value="MO">Month</Option>
                  <Option value="YR">Year</Option>
                </Select>
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
        title="Edit Term"
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
                name="max_term"
                rules={[
                  { required: true, message: 'Please enter term' },
                  { pattern: patterns.integer, message: 'Please enter valid term' }]}>
                <Input placeholder="Edit" />
              </Form.Item>

              <Form.Item
                className='form-group'
                name="type"
                rules={[{ required: true, message: "Please select month or year" }]}>
                <Select placeholder="Month / Year">
                  <Option value="MO">Month</Option>
                  <Option value="YR">Year</Option>
                </Select>
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

export default ManageTermLength;