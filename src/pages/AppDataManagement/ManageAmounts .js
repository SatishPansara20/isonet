import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Button, Form, Input, Modal, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { PrefixSearch } from '../../svg';
import patterns from '../../utils/patterns';
import { searchData } from '../../actions/dashboard';
import { getFundingAmountList, addFundingAmount, deleteFundingAmount, getFundingAmountInfo, patchFundingAmount, } from '../../actions/AppDataManagement/FundingAmountAction';

import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';


const ManageAmounts = () => {

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [amountId, setAmountId] = useState();
  const [initialAmount, setInitialAmount] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  useEffect(() => {
    viewAmount()
  }, [amountId])


  //Listing
  const viewAmount = () => {
    dispatch(getFundingAmountList())
      .then((response) => { setInitialAmount(response?.data) })
      .catch((error) => error?.message)
  }


  //Searching
  const searchAmount = (value) => {
    const data = { search_data: value.trim(), modelname: "Fund", app_name: 'admin_app' }
    dispatch(searchData(data)).then(res => setInitialAmount(res.data)).catch(err => viewAmount())
  }


  //Add Modal
  const showAddModal = () => { setAddModalOpen(true) }

  const handleAddOk = (values) => {
    const data = { funding_amount: values.funding_amount }
    dispatch(addFundingAmount(data))
      .then((response) => {
        toast.success(response?.message);
        form.resetFields();
        setAddModalOpen(false);
        viewAmount()
      }).catch((error) => toast.error(error?.message));
  }

  const handleAddCancel = () => {
    form.resetFields();
    setAddModalOpen(false);
  }


  //Edit Modal
  const showEditModal = (record) => {
    setEditModalOpen(true)
    dispatch(getFundingAmountInfo(record?.id))
      .then((response) => {
        setAmountId(record?.id)
        form.setFieldsValue({
          funding_amount: response?.data?.funding_amount,
        });
      })
  }

  const handleEditOk = (values) => {
    dispatch(patchFundingAmount(amountId, values))
      .then((response) => {
        form?.resetFields();
        toast.success(response?.message);
        setEditModalOpen(false);
        viewAmount();
      }).catch((error) => toast.error(error?.message))
  }

  const handleEditCancel = () => { setEditModalOpen(false); form.resetFields(); }


  //Delete Modal
  const showDeleteModal = (record) => {
    setDeleteModalOpen(true);
    dispatch(getFundingAmountInfo(record?.id))
      .then((response) => {
        setAmountId(record?.id)
      }).catch((error) => error?.message)
  }

  const handleDeleteOk = () => {
    dispatch(deleteFundingAmount(amountId))
      .then((response) => {
        toast.success(response?.message)
        setDeleteModalOpen(false)
        viewAmount()
      }).catch((error) => toast.error(error?.message))
  }

  const handleDeleteCancel = () => setDeleteModalOpen(false);


  const columns = [
    {
      title: 'Amount',
      dataIndex: 'funding_amount',
      key: 'funding_amount',
      sorter: (a, b) => a.funding_amount?.localeCompare(b.funding_amount),
      render: (row, record) => <div>
        <div>{"$"}{record?.funding_amount}</div>
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
            onChange={(e) => searchAmount(e.target.value)}
          />
        </div>
        <div className='btn-list'>
          <Button type="primary" htmlType="submit" onClick={showAddModal}>Add Amount</Button>
        </div>
      </div>

      {/* Table */}
      <Table
        bordered
        columns={columns}
        dataSource={initialAmount || []}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        scroll={{ x: 1200 }}
        className='check-pad-30'
      />

      {/* Add Modal */}
      <Modal
        title="Add Amount"
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
                name="funding_amount"
                rules={[
                  { required: true, message: 'Please enter amount' },
                  { pattern: patterns.numeric, message: 'Please enter valid amount' }]}>
                <Input placeholder="Add Amounts" />
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
        title="Edit Amount"
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
                name="funding_amount"
                rules={[
                  { required: true, message: 'Please enter mount' },
                  { pattern: patterns.numeric, message: 'Please enter valid amount' }]}>
                <Input placeholder="Edit Amounts" />
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

export default ManageAmounts;