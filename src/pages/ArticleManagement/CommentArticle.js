import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { DeleteIcon, HeartIcon } from '../../svg';
import { useDispatch } from 'react-redux';

import moment from 'moment';
import { toast } from 'react-toastify';
import { Button, Modal, Collapse } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { toAbsoluteUrl } from '../../utils';
import { deleteComment, deleteCommentReply, getCommentList } from '../../actions/ArticleManagement';
import '../PostManagement/Post.scss'

const CommentArticle = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Panel } = Collapse;

  const { articleId } = useParams();
  const [replyId, setReplyId] = useState()
  const [commentId, setCommentId] = useState()
  const [initialComment, setInitialComment] = useState([])
  const [commentDeleteModal, setCommentDeleteModal] = useState(false);
  const [replyDeleteModal, setReplyDeleteModalOpen] = useState(false)


  useEffect(() => {
    articleCommentListing();
  }, [articleId])


  // Listing
  const articleCommentListing = () => {
    const data = { article_id: articleId }
    dispatch(getCommentList(data))
      .then((response) => {
        setInitialComment(response?.data?.article_comments)
        if (response?.data?.article_comments?.length < 1) { navigate(-1) }
      }).catch((error) => error?.message)
  }


  // Comment Delete
  const showCommentModal = (commentId) => { setCommentDeleteModal(true); setCommentId(commentId); }

  const handleCommentDeleteOk = () => {
    dispatch(deleteComment({ comment_id: commentId }))
      .then((response) => {
        toast.success(response?.message)
        setCommentDeleteModal(false)
        articleCommentListing()
      }).catch((error) => toast.error(error?.message))
  }

  const handleCommentDeleteCancel = () => setCommentDeleteModal(false);


  // Replay Delete
  const showReplayDeleteModal = (replyId) => { setReplyDeleteModalOpen(true); setReplyId(replyId); }

  const handleReplayDeleteOk = () => {
    dispatch(deleteCommentReply({ reply_id: replyId }))
      .then((response) => {
        toast.success(response?.message)
        setReplyDeleteModalOpen(false)
        articleCommentListing()
      }).catch((error) => toast.error(error?.message))
  }

  const handleReplayDeleteCancel = () => setReplyDeleteModalOpen(false);


  return (
    <>
      <div className='shadow-paper auto-height '>
        {initialComment?.map((item, index) => {
          let duration = moment(item?.created_at).fromNow()
          return (
            <div key={index} className='comment-list'>
              {/* Comments */}
              <div className='comment-post'>
                <div className='d-flex flex-wrap'>
                  <div className='comment-image'>
                    <figure>
                      <img src={item?.user_id?.profile_img ? item?.user_id?.profile_img : toAbsoluteUrl('/images/user-img.svg')} alt="Profile" title={item?.user_id?.profile_img ? "" : "not found"} />
                    </figure>
                  </div>
                  <div className='comment-desc'>
                    <h2 className='title'>{item?.user_id?.first_name} {item?.user_id?.last_name} <span className='time'>{duration}</span></h2>
                    <span className='company'>{item?.user_id?.company_name || "-"}</span>
                  </div>
                </div>
                <div className="description">
                  <p>{item?.comment}</p>
                </div>
                <div className='footer-post'>
                  <div ><Button className='common-btn'><HeartIcon />{item?.likes}</Button></div>
                  <div ><Button className='common-btn' onClick={() => showCommentModal(item?.main_comment_id)}><DeleteIcon /></Button></div>
                </div>
              </div>
              {/* Reply */}
              <div className='sub-comment'>
                {item?.comment_replies?.length ?
                  <Collapse defaultActiveKey={['1']} ghost>
                    <Panel header={item?.comment_replies?.length + `${item?.comment_replies?.length > 1 ? " Replies" : " Reply"}`}>
                      {item?.comment_replies?.map((reply, index) => {
                        return (
                          <div key={index} className='comment-post'>
                            <div className='d-flex flex-wrap'>
                              <div className='comment-image'>
                                <figure>
                                  <img src={reply?.profile_img ? reply?.profile_img : toAbsoluteUrl('/images/user-img.svg')} alt="Profile" title={reply?.profile_img ? "" : "not found"} />
                                </figure>
                              </div>
                              <div className='comment-desc'>
                                <h2 className='title'>{reply?.first_name} {reply?.last_name} <span className='time'>{duration}</span></h2>
                                <span className='company'>{reply?.company_name}</span>
                              </div>
                            </div>
                            <div className="description">
                              <p>{reply?.replies}</p>
                            </div>
                            <div className='footer-post'>
                              <div className='replay'>
                                <Button type='button' className='common-btn'><HeartIcon />{reply?.replies_likes} </Button>
                              </div>
                              <div className='like-btn'>
                                <Button type='button' className='common-btn' onClick={() => showReplayDeleteModal(reply?.replies_id)}><DeleteIcon /></Button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </Panel>
                  </Collapse>
                  : ""}
              </div>
            </div>
          )
        })}
      </div>


      {/* Comment Delete Modal */}
      <Modal
        title="Delete Comment"
        open={commentDeleteModal}
        onOk={handleCommentDeleteOk}
        onCancel={handleCommentDeleteCancel}
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


      {/* Replay Delete Modal */}
      <Modal
        title="Delete Replay"
        open={replyDeleteModal}
        onOk={handleReplayDeleteOk}
        onCancel={handleReplayDeleteCancel}
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

export default CommentArticle;