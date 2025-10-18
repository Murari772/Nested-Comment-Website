import React, { useState } from "react";
import "./ReplyBox.css";

function ReplyBox({ commentId, onSubmit, onCancel }) {
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!replyText.trim()) return;
    setLoading(true);

    try {
      const response = await fetch(`https://nested-comment-website-1.onrender.com/reply/${commentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: replyText }),
      });

      const newReply = await response.json();
      onSubmit(newReply); 
      setReplyText("");
    } catch (error) {
      console.error("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reply-box">
      <textarea
        className="reply-textarea"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Write your reply..."
      />
      <div className="reply-actions">
        <button
          className="reply-submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <button className="reply-cancel" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ReplyBox;
