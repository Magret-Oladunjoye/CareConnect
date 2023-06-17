import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import CommentStats from "./CommentStats";
import Footer from "./Footer.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";

function CommentSection() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchCommentsRatings = async () => {
      try {
        const response = await axios.get(`/search_doctor/${id}/comments_ratings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const { data } = response; // The data will be an array of comments

        console.log("Fetched comments:", data);
        setComments(data ?? []);
      } catch (error) {
        console.log("Failed to fetch comments and ratings");
      }
    };

    fetchCommentsRatings();
  }, [id]);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const { data } = response;
        setLoggedInUser(data.data);
      } catch (error) {
        setError("Failed to fetch logged-in user");
      }
    };

    fetchLoggedInUser();
  }, []);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!loggedInUser) return; // user must be logged in to comment.
    if (!newComment.trim()) return; // don't allow empty comments

    try {
      const response = await axios.put(
        `/search_doctor/${id}/ratings`,
        {
          rating,
          comment: newComment.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        // Comment and rating added successfully
        const newCommentData = {
          username: loggedInUser.username,
          rating,
          comment: newComment,
          date: new Date().toLocaleString(), // Update the date format here
        };

        // Update the comments state
        setComments((prevComments) => [...prevComments, newCommentData]);

        // Clear the new comment and rating inputs
        setNewComment("");
        setRating(0);
      } else {
        // Handle error case
        setError("Failed to add comment");
      }
    } catch (error) {
      setError("Error adding comment");
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className="bg-sky-50 pr-16 pl-16 md:pl-64 md:pr-64">
        <div className="text-right text-lg text-gray-00" id="comments">
          <CommentStats comments={comments} />
        </div>
        <div className="w-full pb-8 pt-4">
          {loggedInUser ? (
            <form onSubmit={handleCommentSubmit}>
              <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
              <label htmlFor="comment-input" className="sr-only">
                Comment
              </label>
              <textarea
                id="comment-input"
                className="border hover:border-sky-500 rounded-lg w-full p-2 mb-4"
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
                placeholder="Write your comment here"
                required
              />
              <div className="grid grid-cols-3 pt-4 pb-6">
                <p className="font-bold">Rate your experience out of 5-stars:</p>
                <StarRating rating={rating} onRatingChange={setRating} />
                <button
                  type="submit"
                  className="bg-800 hover:bg-700 text-white font-bold py-2 px-4 w-auto rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <p className="text-lg font-bold mb-4">
              Please <a href="/auth/login">log in</a> to leave a comment.
            </p>
          )}

          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul>
              {comments.map(({ username, rating, comment, date }, index) => (
                <li key={index} className="border border-gray-300 rounded-lg p-4 mb-4">
                  <p className="text-lg font-bold">{username}</p>
                  <StarRating rating={rating} disabled />
                  <p className="flex inline-flex text-gray-600">{comment}</p>
                  <p className="text-sm text-gray-400">{date}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CommentSection;
