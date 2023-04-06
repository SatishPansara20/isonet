import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Button, Form, Input, Modal, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { PrefixSearch } from '../../svg';
import patterns from '../../utils/patterns';
import { searchData } from '../../actions/dashboard';
import { addBuyRates, deleteBuyRates, getBuyRatesInfo, patchBuyRates, getBuyRatesList } from '../../actions/AppDataManagement/BuyRatesAction';

import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';


const ManageRates = () => {

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [rateId, setRateId] = useState();
  const [initialRate, setInitialRate] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  useEffect(() => {
    viewRates()
  }, [rateId])

  //Listing
  const viewRates = () => {
    dispatch(getBuyRatesList())
      .then((response) => { setInitialRate(response?.data) })
      .catch((error) => error?.message)
  }

  //Add Modal
  const showAddModal = () => {
    setAddModalOpen(true)
  }

  const handleAddOk = (values) => {
    const data = { max_buy_rates: values.max_buy_rates }
    dispatch(addBuyRates(data))
      .then((response) => {
        toast.success(response?.message);
        form.resetFields();
        setAddModalOpen(false);
        viewRates()
      }).catch((error) => toast.error(error?.message));
  }

  const handleAddCancel = () => {
    form.resetFields();
    setAddModalOpen(false);
  }



  //Edit Modal
  const showEditModal = (record) => {
    setEditModalOpen(true)
    dispatch(getBuyRatesInfo(record?.id))
      .then((response) => {
        setRateId(record?.id)
        form.setFieldsValue({
          max_buy_rates: response?.data?.max_buy_rates,
        });
      })
  }

  const handleEditOk = (values) => {
    dispatch(patchBuyRates(rateId, values))
      .then((response) => {
        form?.resetFields();
        toast.success(response?.message);
        setEditModalOpen(false);
        viewRates()
      }).catch((error) => toast.error(error?.message))
  }

  const handleEditCancel = () => {
    setEditModalOpen(false)
    form.resetFields();
  }


  //Delete Modal
  const showDeleteModal = (record) => {
    setDeleteModalOpen(true);
    dispatch(getBuyRatesInfo(record?.id))
      .then((response) => {
        setRateId(record?.id)
      }).catch((error) => error?.message)
  }

  const handleDeleteOk = () => {
    dispatch(deleteBuyRates(rateId))
      .then((response) => {
        toast.success(response?.message)
        setDeleteModalOpen(false)
        viewRates()
      }).catch((error) => toast.error(error?.message))
  }

  const handleDeleteCancel = () => setDeleteModalOpen(false);


  const changeIndustry = (value) => {
    const data = {
      search_data: value.trim(),
      modelname: "BuyRates",
      app_name: 'admin_app'
    }
    dispatch(searchData(data)).then(res => setInitialRate(res.data)).catch(err => viewRates())
  }

  const columns = [
    {
      title: 'Rates',
      dataIndex: 'max_buy_rates',
      key: 'max_buy_rates',
      sorter: (a, b) => a?.max_buy_rates - b?.max_buy_rates,
      render: (row, record) => <div>
        <div>{record?.max_buy_rates}</div>
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
            onChange={(e) => changeIndustry(e.target.value)}
          />
        </div>
        <div className='btn-list'>
          <Button type="primary" htmlType="submit" onClick={showAddModal}>Add Rate</Button>
        </div>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={initialRate || []}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        scroll={{ x: 1200 }}
        className='check-pad-30'
      />

      {/* Add Modal */}
      <Modal
        title="Add Rate"
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
                name="max_buy_rates"
                rules={[
                  { required: true, message: 'Please enter rate' },
                  { pattern: patterns.numeric, message: 'Please enter valid rate' }]}>
                <Input placeholder="Add Rates" />
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
        title="Edit Rate"
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
                name="max_buy_rates"
                rules={[
                  { required: true, message: 'Please enter rate' },
                  { pattern: patterns.numeric, message: 'Please enter valid rate' }]}>
                <Input placeholder="Edit Rates" />
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

export default ManageRates;