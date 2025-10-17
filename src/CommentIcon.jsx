import React, { useState } from 'react';
import './CommentIcon.css';
import users from '../users.json';
import VoteButtons from './VoteButtons';
import ReplyBox from './ReplyBox'; 

function CommentIcon({ comment, onUpvote, onDownvote, onReplyAdded }) {
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleReplySubmit = (newReply) => {
    onReplyAdded(newReply);
    setShowReplyBox(false);
  };

  const date = new Date(comment.created_at).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const user = users.find((person) => person.id === comment.user_id);

  return (
    <div className="comment-card">
      <div className="comment-header">
        <img src={user?.avatar} alt={user?.name} className="comment-avatar" />
        <span className="comment-user">{user?.name}</span>
        <span className="comment-date">{date}</span>
      </div>

      <div className="comment-text">{comment.text}</div>

      <div className="comment-footer">
        <VoteButtons
          comment={comment}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
        />
        {!showReplyBox && (
          <button
            onClick={() => setShowReplyBox(true)}
            className="reply-btn"
          >
            Reply
          </button>
        )}
      </div>

      {showReplyBox && (
        <ReplyBox
          commentId={comment.id}
          onSubmit={handleReplySubmit}
          onCancel={() => setShowReplyBox(false)}
        />
      )}
    </div>
  );
}

export default CommentIcon;
