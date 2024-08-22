import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Styles/Card.css";
import { useAuth } from "../Authcontext";
import { useWishlist } from "./WishContext";

const Cards = ({ book, getImage }) => {
  const cardRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ mouseX: 0, mouseY: 0 });

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState({});

  const { currentUser } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();

  const [isLiked, setIsLiked] = useState(
    wishlist.some((item) => item.id === book.id)
  );

  useEffect(() => {
    const card = cardRef.current;
    const updateDimensions = () => {
      setDimensions({ width: card.offsetWidth, height: card.offsetHeight });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    setIsLiked(wishlist.some((item) => item.id === book.id));
  }, [wishlist, book.id]);

  const handleMouseMove = (event) => {
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left - rect.width / 2;
    const mouseY = event.clientY - rect.top - rect.height / 2;
    setMousePosition({ mouseX, mouseY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ mouseX: 0, mouseY: 0 });
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const { width, height } = dimensions;
  const { mouseX, mouseY } = mousePosition;

  const mousePX = mouseX / width;
  const mousePY = mouseY / height;

  const handleCommentsSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    const comment = {
      id: comments.length + 1,
      user: currentUser ? currentUser.name : "User",
      userId: currentUser ? currentUser.uid : null,
      text: newComment,
      timestamp: new Date(),
      likes: 0,
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleLike = (commentId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [commentId]: (prevLikes[commentId] || 0) + 1,
    }));
  };

  const handleDelete = (commentId) => {
    setComments((prevComment) =>
      prevComment.filter((comment) => comment.id !== commentId)
    );
  };

  const cardStyle = {
    transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`,
  };

  const handleWishlistClick = () => {
    toggleWishlist(book);
  };

  return (
    <div className={`card-container ${showComments ? "expanded" : ""}`}>
      <div
        className="card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={cardStyle}
      >
        <img src={book.imageUrl || getImage(book.imageLink)} alt={book.title} />
        <div className="card-content">
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
        </div>
        <span
          onClick={handleWishlistClick}
          className={`wishIcon ${isLiked ? "liked" : ""}`}
        >
          <FontAwesomeIcon
            icon={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
          />
        </span>
        <button className="Show" onClick={toggleComments}>
          <FontAwesomeIcon icon="fa-solid fa-comments" />
        </button>

        <div className={`comments ${showComments ? "show" : ""}`}>
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.id} className="comment">
                <div className="comment-header">
                  <h4>{comment.user}</h4>
                  <div className="comment-body">{comment.text}</div>
                  <h5>
                    Posted:
                    {Math.floor((new Date() - comment.timestamp) / 60000)} min
                    ago
                    <span
                      style={{ paddingLeft: "10px" }}
                      onClick={() => handleLike(comment.id)}
                    >
                      <FontAwesomeIcon icon="fa-regular fa-thumbs-up" />
                    </span>
                    <span>{likes[comment.id] || 0}</span>
                    {currentUser && comment.userId && (
                      <span
                        style={{ paddingLeft: "10px" }}
                        onClick={() => handleDelete(comment.id)}
                      >
                        <FontAwesomeIcon icon="fa-solid fa-trash" />
                      </span>
                    )}
                  </h5>
                </div>
              </li>
            ))}
          </ul>
          <form className="send" onSubmit={handleCommentsSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Type your comment here"
            />
            <button type="submit"> send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cards;
