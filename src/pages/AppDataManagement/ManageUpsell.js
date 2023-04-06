import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Button, Form, Input, Modal, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { PrefixSearch } from '../../svg';
import patterns from '../../utils/patterns';
import { searchData } from '../../actions/dashboard';
import { addUpSellPoints, deleteUpSellPoints, getUpSellPointsInfo, patchUpSellPoints, getUpSellPointsList } from '../../actions/AppDataManagement/UpSellPointsAction';

import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';


const ManageUpSellPoints = () => {

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [upSellPointId, setUpSellPointId] = useState();
  const [initialUpSellPoints, setUpSellPoint] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  useEffect(() => {
    viewUpSellPoint()
  }, [upSellPointId])


  //Listing
  const viewUpSellPoint = () => {
    dispatch(getUpSellPointsList())
      .then((response) => { setUpSellPoint(response?.data) })
      .catch((error) => error?.message)
  }

  // Searching
  const searchUpSellPoints = (value) => {
    const data = { search_data: value.trim(), modelname: "UpSellPoints", app_name: 'admin_app' }
    dispatch(searchData(data)).then(res => setUpSellPoint(res.data)).catch(err => viewUpSellPoint())
  }


  //Add Modal
  const showAddModal = () => { setAddModalOpen(true) }

  const handleAddOk = (values) => {
    const data = { sell_points: values.sell_points }
    dispatch(addUpSellPoints(data))
      .then((response) => {
        toast.success(response?.message);
        form.resetFields();
        setAddModalOpen(false);
        viewUpSellPoint()
      }).catch((error) => toast.error(error?.message));
  }

  const handleAddCancel = () => { form.resetFields(); setAddModalOpen(false); }


  //Edit Modal
  const showEditModal = (record) => {
    setEditModalOpen(true)
    dispatch(getUpSellPointsInfo(record?.id))
      .then((response) => {
        setUpSellPointId(record?.id)
        form.setFieldsValue({ sell_points: response?.data?.sell_points, });
      })
  }

  const handleEditOk = (values) => {
    dispatch(patchUpSellPoints(upSellPointId, values))
      .then((response) => {
        form?.resetFields();
        toast.success(response?.message);
        setEditModalOpen(false);
        viewUpSellPoint();
      }).catch((error) => toast.error(error?.message))
  }

  const handleEditCancel = () => { setEditModalOpen(false); form.resetFields(); }


  //Delete Modal
  const showDeleteModal = (record) => {
    setDeleteModalOpen(true);
    dispatch(getUpSellPointsInfo(record?.id))
      .then((response) => { setUpSellPointId(record?.id) })
      .catch((error) => error?.message)
  }

  const handleDeleteOk = () => {
    dispatch(deleteUpSellPoints(upSellPointId))
      .then((response) => {
        toast.success(response?.message)
        setDeleteModalOpen(false)
        viewUpSellPoint()
      }).catch((error) => toast.error(error?.message))
  }

  const handleDeleteCancel = () => setDeleteModalOpen(false);

  // Table Columns
  const columns = [
    {
      title: 'Upsell Points',
      dataIndex: 'sell_points',
      key: 'sell_points',
      sorter: (a, b) => a?.sell_points - b?.sell_points,
      render: (row, record) => <div>
        <div>{record?.sell_points}</div>
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
            onChange={(e) => searchUpSellPoints(e.target.value)}
          />
        </div>
        <div className='btn-list'>
          <Button type="primary" htmlType="submit" onClick={showAddModal}>Add upsell point</Button>
        </div>
      </div>

      {/* Table */}
      <Table
        bordered
        columns={columns}
        dataSource={initialUpSellPoints || []}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        scroll={{ x: 1200 }}
        className='check-pad-30'
      />


      {/* Add Modal */}
      <Modal
        title="Add Upsell Point"
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
                name="sell_points"
                rules={[
                  { required: true, message: 'Please enter upsell points' },
                  { pattern: patterns.numeric, message: 'Please enter valid upsell point' },
                ]} >
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
        title="Edit Upsell Point"
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
                name="sell_points"
                rules={[
                  { required: true, message: 'Please enter upsell points' },
                  { pattern: patterns.numeric, message: 'Please enter valid upsell point' },
                ]} >
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

export default ManageUpSellPoints;