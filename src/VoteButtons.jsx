import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import './VoteButtons.css';

function VoteButtons({ comment, onUpvote, onDownvote }) {

  const handleUpvote = (e) => {
    const upvoteBtn = e.currentTarget;
    const downvoteBtn = upvoteBtn.parentElement.querySelector(".downvote-btn");
    const isUpActive = upvoteBtn.classList.contains("active");
    const isDownActive = downvoteBtn.classList.contains("active");

    if (isDownActive) {
      downvoteBtn.classList.remove("active");
      upvoteBtn.classList.add("active");
      
      onUpvote(comment._id)(e); 
      onUpvote(comment._id)(e); 
      return;
    }

    if (isUpActive) {
      upvoteBtn.classList.remove("active");
      onDownvote(comment._id)(e); 
      return;
    }

    upvoteBtn.classList.add("active");
    onUpvote(comment._id)(e);
  };

  const handleDownvote = (e) => {
    const downvoteBtn = e.currentTarget;
    const upvoteBtn = downvoteBtn.parentElement.querySelector(".upvote-btn");
    const isDownActive = downvoteBtn.classList.contains("active");
    const isUpActive = upvoteBtn.classList.contains("active");

    if (isUpActive) {
      upvoteBtn.classList.remove("active");
      downvoteBtn.classList.add("active");
  
      onDownvote(comment._id)(e);
      onDownvote(comment._id)(e);
      return;
    }

    if (isDownActive) {
      downvoteBtn.classList.remove("active");
      onUpvote(comment._id)(e); 
      return;
    }

    downvoteBtn.classList.add("active");
    onDownvote(comment._id)(e);
  };

  return (
    <div className="vote-section">
      <button
        className="vote-btn upvote-btn"
        onClick={handleUpvote}
        aria-label="Upvote comment"
      >
        <ArrowUp size={18} strokeWidth={2.5} />
      </button>
      <span className="comment-upvotes">{comment.upvotes || 0}</span>
      <button
        className="vote-btn downvote-btn"
        onClick={handleDownvote}
        aria-label="Downvote comment"
      >
        <ArrowDown size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default VoteButtons;
