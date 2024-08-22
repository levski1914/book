// RatingStars.js
import React, { useState } from "react";

import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../Authcontext";
import "./RatingStars.css";
const RatingStars = ({ bookId, initialRating }) => {
  const { currentUser } = useAuth();
  const [value, setValue] = useState(initialRating || 0);
  const handleRatingChange = async (newValue) => {
    if (currentUser) {
      setValue(newValue);
      if (bookId) {
        const bookRef = doc(db, "books", bookId);
        await updateDoc(bookRef, {
          rating: newValue,
        });
      }
    } else {
      alert("You need to be logged in to rate this book.");
    }
  };
  return (
    <>
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= value ? "star filled" : "star"}
            onClick={() => handleRatingChange(star)}
          >
            &#9733;
          </span>
        ))}
      </div>
    </>
  );
};

export default RatingStars;
