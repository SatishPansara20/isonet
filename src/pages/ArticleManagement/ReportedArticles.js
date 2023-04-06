import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { Button, Modal, Space, Table } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import { toAbsoluteUrl } from "../../utils";
import { CommentIcon, LikeIcon, PrefixSearch } from "../../svg";
import { searchReportedArticle } from "../../actions/dashboard";
import { deleteArticle, getArticleInfo, postReportedArticleList, } from "../../actions/ArticleManagement";

import "../../components/common/scss/FormField.scss";
import "../PostManagement/Post.scss";
import { DebounceInput } from "react-debounce-input";


const ReportedArticles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [reportedArticle, setReportedArticle] = useState([]);
  const [reportedArticleId, setReportedArticleId] = useState();
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewModalRecord, setViewModalRecord] = useState();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  useEffect(() => {
    reportedArticleList();
  }, []);


  //Listing
  const reportedArticleList = () => {
    dispatch(postReportedArticleList())
      .then((response) => { if (response.status === 200) { setReportedArticle(response?.data); } })
      .catch((error) => error?.message);
  };


  // Searching
  const searchReportedArticlefunction = (value) => {
    const data = { query: value.trim(), };
    dispatch(searchReportedArticle(data))
      .then((res) => setReportedArticle(res.data))
      .catch((err) => reportedArticleList());
  };


  // View Modal
  const showViewModal = (record) => {
    dispatch(getArticleInfo(record))
      .then((response) => { if (response?.status === 200) { setViewModalRecord(response?.data); } })
      .catch((error) => error?.message);
    setViewModalOpen(true);
  };

  const handleViewCancel = () => { setViewModalOpen(false); };


  //Delete Modal
  const showDeleteModal = (record) => {
    setDeleteModalOpen(true);
    dispatch(getArticleInfo(record))
      .then((response) => { setReportedArticleId(response?.data?.id); })
      .catch((error) => error?.message);
  };

  const handleDeleteOk = () => {
    dispatch(deleteArticle(reportedArticleId))
      .then((response) => {
        if (response?.status === 200) {
          toast.success(response?.message);
          setDeleteModalOpen(false);
          reportedArticleList();
        }
      })
      .catch((error) => toast.error(error?.message));
  };

  const handleDeleteCancel = () => setDeleteModalOpen(false);


  // Table Columns
  const columns = [
    {
      title: "Article image",
      dataIndex: "image",
      key: "image",
      render: (row, record) => (
        <>
          {record?.article_media?.map((item) => (
            <div div className="image">
              <img
                src={item?.article_media ? item?.article_media : toAbsoluteUrl("/images/logo-icon.svg")}
                alt="Article"
                title={item?.article_media ? "" : "not found"}
              />
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Author name",
      dataIndex: "author_name",
      key: "author_name",
      sorter: (a, b) => a?.author_name.localeCompare(b?.author_name),
      render: (row, record) => (
        <div>
          <div>{record?.author_name}</div>
        </div>
      ),
    },
    {
      title: "Articles title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a?.title.localeCompare(b?.title),
      render: (row, record) => (
        <div>
          <div>
            {record?.title.length > 20
              ? record?.title.slice(0, 25) + "..."
              : record?.title}
          </div>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a?.description.localeCompare(b?.description),
      render: (row, record) => (
        <div>
          <div>
            {record?.description.length > 30
              ? record?.description.slice(0, 30) + "..."
              : record?.description}
          </div>
        </div>
      ),
    },
    // {
    //   title: 'Reported By',
    //   dataIndex: 'reported_by',
    //   key: 'reported_by',
    //   render: (row, record) => (
    //     <>
    //       {record?.reported_by?.length > 2 ? record?.reported_by[0].first_name + "..." :
    //         record?.reported_by?.map((item) => (
    //           <div>{item?.first_name}</div>
    //         ))}
    //     </>
    //   )
    // },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      className: "action",
      render: (row, record) => (
        <Space>
          <Button className="action-btn" icon={<EyeOutlined />} onClick={() => showViewModal(record?.id)} />
          <Button className="action-btn" icon={<DeleteOutlined />} onClick={() => showDeleteModal(record?.id)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="patients-search">
        <div className="custom-search">
          <span className="icon">
            <PrefixSearch />
          </span>
          <DebounceInput
            className="searchBox"
            debounceTimeout={1000}
            placeholder="Search Here"
            onChange={(e) => searchReportedArticlefunction(e.target.value)}
          />
        </div>
      </div>


      {/* Table */}
      <Table
        bordered
        columns={columns}
        dataSource={reportedArticle || []}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 50, 100],
        }}
        scroll={{ x: 1200 }}
        className="check-pad-30"
      />


      {/* View Modal */}
      <Modal
        title="Reported Article Details"
        open={viewModalOpen}
        className="common-modal post-modal footer-none"
        width={550}
        centered
        onCancel={handleViewCancel}
      >
        <div className="funder-detail">
          <ul>
            <li>
              <span className="left">Article title</span>
              <span className="right">{viewModalRecord?.title}</span>
            </li>
            <li>
              <span className="left">Author name</span>
              <span className="right">{viewModalRecord?.author_name}</span>
            </li>

            <li>
              <span className='left'>Description</span>
              <span className='right'>
                {viewModalRecord?.description?.length < 30 ?
                  <div>{viewModalRecord?.description}</div>
                  :
                  <textarea cols="40" rows="3" value={viewModalRecord?.description} disabled />
                }
              </span>
            </li>


            {viewModalRecord?.reported_by?.length ?
              <li>
                <span className='left'>Reported By</span>
                <span className='right'>
                  {viewModalRecord?.reported_by?.length > 2 ?
                    <textarea cols="40" rows="3" value={viewModalRecord?.reported_by.map((item) => " " + item?.first_name)} disabled />
                    :
                    viewModalRecord?.reported_by?.map((item, index) => <div key={index}>{item?.first_name}</div>)
                  }
                </span>
              </li>
              : ""}

          </ul>

          <br />
          <div className="post-image">
            {viewModalRecord?.article_media?.map((item) => {
              return (
                <a href={item?.article_media} target="_blank" rel="noreferrer">
                  <img
                    src={
                      item?.article_media
                        ? item?.article_media
                        : toAbsoluteUrl("/images/user-img.svg")
                    }
                    title={item?.article_media ? "" : "not found"}
                    alt=""
                    width={500}
                    height={250}
                  />
                </a>
              );
            })}
          </div>

          <div className="post-detail">
            <div className="footer-post">
              <span className="like">
                <LikeIcon />
                {viewModalRecord?.likes}
              </span>
              {viewModalRecord?.comment === 0 ? (
                <span className="comment">
                  <CommentIcon />
                  {viewModalRecord?.comment}{" "}Comment
                </span>
              ) : (
                <span
                  className="comment"
                  onClick={() =>
                    navigate(
                      `/article-management/all-article/${viewModalRecord?.id}/article-comments`
                    )
                  }
                >
                  <CommentIcon />
                  {viewModalRecord?.comment} {viewModalRecord?.comment <= 1 ? "Comment" : "Comments"}
                </span>
              )}
            </div>
          </div>
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
        className="delete-modal"
      >
        <div className="text-center desc">
          <DeleteOutlined />
          <p>Are you sure you want to delete ?</p>
        </div>
      </Modal>
    </>
  );
};

export default ReportedArticles;
