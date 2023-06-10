import { useContext, useState, useEffect } from "react";
import StarRating from "./StarRating";
import CommentStats from "./CommentStats";
import Footer from "./Footer.jsx";
import { UserContext } from "../lib/UserContext";
import { useParams } from "react-router-dom";

function CommentSection() {
  const { loggedIn } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const fetchCommentsRatings = async () => {
      try {
        const response = await fetch(`/search_doctor/${id}/comments_ratings`);
        if (response.ok) {
          const data = await response.json();
          setComments(data.comments ?? []);
          setRatings(data.ratings ?? []);
        } else {
          console.error("Failed to fetch comments and ratings:", response.status);
        }
      } catch (error) {
        console.error("Error fetching comments and ratings:", error);
      }
    };

    fetchCommentsRatings();
  }, [id]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!loggedIn) return; // user must be logged in to comment.
    if (!newComment.trim()) return; // don't allow empty comments

    try {
      const response = await fetch(`/search_doctor/${id}/ratings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comment: newComment.trim(),
        }),
      });

      if (response.ok) {
        // Comment and rating added successfully
        const newCommentData = {
          username: "Current User", // Update with actual username
          rating,
          comment: newComment,
          date: new Date().toISOString(), // Update with actual date
        };

        setComments((prevComments) => [...prevComments, newCommentData]);
        setRatings((prevRatings) => [...prevRatings, rating]);
        setNewComment("");
        setRating(0);
      } else {
        // Handle error case
        console.error("Failed to add comment:", response.status);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <div className="bg-sky-50 pr-16 pl-16 md:pl-64 md:pr-64">
        <div className="text-right text-lg text-gray-00" id="comments">
          <CommentStats comments={comments} />
        </div>
        <div className="w-full pb-8 pt-4">
          {loggedIn ? (
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
                <p className="font-bold">
                  Rate your experience out of 5-stars:
                </p>
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
              {comments.map(({ username, comment, date }, index) => (
                <li
                  key={index}
                  className="border border-gray-300 rounded-lg p-4 mb-4"
                >
                  <p className="text-lg font-bold">{username}</p>
                  <StarRating rating={ratings[index]} disabled />
                  <p className="flex inline-flextext-gray-600">{comment}</p>
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
