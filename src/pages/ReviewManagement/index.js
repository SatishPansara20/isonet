import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import moment from 'moment';
import { toast } from 'react-toastify';
import { Button, Modal, Space, Table } from 'antd'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';

import { PrefixSearch } from '../../svg';
import { toAbsoluteUrl } from '../../utils';
import { searchData } from '../../actions/dashboard';
import { deleteReview, getReviewList } from '../../actions/ReviewAction';

import '../../components/common/scss/FormField.scss'
import { DebounceInput } from 'react-debounce-input';


const ReviewManagement = () => {

  const dispatch = useDispatch();

  const [review, setReview] = useState([]);
  const [reviewId, setReviewId] = useState();
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  useEffect(() => {
    viewReviewListing()
  }, [])


  //Listing
  const viewReviewListing = () => {
    dispatch(getReviewList())
      .then((response) => { setReview(response?.data) })
      .catch((error) => error?.message)
  }


  // Searching
  const searchReview = (value) => {
    const data = { search_data: value.trim(), modelname: "companyReview", app_name: 'baseapp' }
    dispatch(searchData(data)).then(res => setReview(res.data)).catch(err => viewReviewListing())
  }


  //View Modal Start
  const showViewModal = (record) => { setViewModalOpen(true); setReviewId(record) }

  const handleViewCancel = () => { setViewModalOpen(false) }


  //Delete Modal Start
  const showDeleteModal = (record) => { setDeleteModalOpen(true); setReviewId(record?.id) }

  const handleDeleteOk = () => {
    dispatch(deleteReview(reviewId))
      .then((response) => {
        toast.success(response?.message)
        setDeleteModalOpen(false)
        viewReviewListing()
      }).catch((error) => toast.error(error?.message))
  }

  const handleDeleteCancel = () => setDeleteModalOpen(false);

  // Table Columns
  const columns = [
    {
      title: 'Company Image',
      dataIndex: 'company_image',
      key: 'company_image',
      render: (row, record) => (
        <div className='image'>
          <img src={record?.company_image ? record.company_image : toAbsoluteUrl('/images/company_image.png')} alt="Company" title={record?.company_image ? "" : "not found"} />
        </div>
      )
    },
    {
      title: 'Company Name',
      dataIndex: 'company_name',
      key: 'company_name',
      sorter: (a, b) => a?.company_name?.localeCompare(b?.company_name),
      render: (row, record) => <div>
        <div>{record?.company_name}</div>
      </div>
    },
    {
      title: 'Reviewed By',
      dataIndex: 'review_by',
      key: 'review_by',
      sorter: (a, b) => a?.review_by?.localeCompare(b?.review_by),
      render: (row, record) => <div>
        <div>{record?.review_by}</div>
      </div>
    },
    {
      title: 'Review',
      dataIndex: 'review',
      key: 'review',
      sorter: (a, b) => a?.review?.localeCompare(b?.review),
      render: (row, record) => <div>
        <div> {record?.review?.length > 20 ? record?.review.slice(0, 20) + "..." : record?.review}</div >
      </div>
    },
    {
      title: 'Posted At',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a, b) => a?.created_at?.localeCompare(b?.created_at),
      render: (row, record) => <div>
        <div>{moment.utc(record?.created_at).format("MM-DD-YYYY")}</div>
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
            onChange={(e) => searchReview(e.target.value)}
          />
        </div>
      </div>

      <Table
        bordered
        columns={columns}
        dataSource={review || []}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        scroll={{ x: 1200 }}
        className='check-pad-30'
      />

      {/* View Modal Start */}
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
            <a href={reviewId?.company_image} target="_blank" rel="noreferrer">
              <img src={reviewId?.company_image ? reviewId.company_image : toAbsoluteUrl('/images/company_image.png')} alt="Company" title={reviewId?.company_image ? "" : "not found"} />
            </a>
          </div>
          <ul>
            <li>
              <span className='left'>Company name</span>
              <span className='right'>{reviewId?.company_name || "Company name not found"}</span>
            </li>
            <li>
              <span className='left'>Reviewed by</span>
              <span className='right'>{reviewId?.review_by || "-"}</span>
            </li>
            <li>
              <span className='left'>Review</span>
              {reviewId?.review?.length < 40 ? <span>{reviewId?.review}</span> : <textarea cols={50} rows={5} value={reviewId?.review} disabled />}
            </li>
          </ul>
        </div>
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

export default ReviewManagement;