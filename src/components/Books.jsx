import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Books = ({ book, addToWishlist, getImage }) => {
  //   const bookRef=useRef(null)

  return (
    <li className="books">
      <img src={getImage(book.imageLink)} alt="" />
      <div className="bookDetails">
        <h2>{book.title}</h2>
        <p>Author: {book.author}</p>
      </div>
      <span onClick={() => addToWishlist(book)} className="wishIcon">
        <FontAwesomeIcon icon="fa-regular fa-heart" />
      </span>
    </li>
  );
};

export default Books;
