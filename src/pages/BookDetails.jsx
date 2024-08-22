import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const bookDoc = doc(db, "books", id);
      const bookSnapshot = await getDoc(bookDoc);
      if (bookSnapshot.exists()) {
        setBook(bookSnapshot.data());
      }
    };
    fetchBook();
  }, [id]);

  return (
    <>
      <div>
        {book ? (
          <div>
            <h1>Title: {book.title}</h1>
            <p>Author: {book.author}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default BookDetails;
