import { useState, useEffect } from 'react'
import './App.css'
import CommentIcon from './CommentIcon'

function Comment({ comment, allComments, onUpvote, onDownvote, onReplyAdded }) {
  const replies = allComments.filter((item) => item.parent_id === comment.id);

  return (
    <li>
      <CommentIcon 
        comment={comment} 
        onUpvote={onUpvote}
        onDownvote={onDownvote}
        onReplyAdded={onReplyAdded}
      />
      <ul>
        {replies.map((reply) => (
          <Comment 
            key={reply._id}
            comment={reply} 
            allComments={allComments}
            onUpvote={onUpvote} 
            onDownvote={onDownvote}
            onReplyAdded={onReplyAdded}
          />
        ))}
      </ul>
    </li>
  );
}

function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("https://nested-comment-website-1.onrender.com/comments")
      .then((res) => res.json())
      .then((data) => setComments(data))
  }, []);

  const updateCommentState = (updatedComment) => {
    setComments((prevComments) => 
      prevComments.map((comment) => 
        comment._id === updatedComment._id ? updatedComment : comment
      )
    );
  };

  const handleReplyAdded = (newReply) => {
    setComments((prev) => [...prev, newReply]);
  };

  const handleVote = async (commentId, type, buttonElement) => {
    
    const response = await fetch(`https://nested-comment-website-1.onrender.com/comments/${commentId}/${type}`, {
      method: 'POST',
    });

    const updatedComment = await response.json();
    updateCommentState(updatedComment);
    
  };

  const handleUpvote = (commentId) => (e) => handleVote(commentId, 'upvote', e.currentTarget);
  const handleDownvote = (commentId) => (e) => handleVote(commentId, 'downvote', e.currentTarget);

  const mainComments = comments.filter((comm) => comm.parent_id === null);

  return (
    <div className="comments-container">
      <ul className="comments-list">
        {mainComments.map((comm) => (
          <Comment 
            key={comm._id} 
            comment={comm} 
            allComments={comments} 
            onUpvote={handleUpvote} 
            onDownvote={handleDownvote}
            onReplyAdded={handleReplyAdded}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
