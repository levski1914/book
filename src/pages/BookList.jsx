import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useWishlist } from "./WishContext";
import "./Styles/BookList.css";
import RatingStars from "../components/Rating";
import Aside from "./Aside";

const images = import.meta.glob("../assets/images/*.{png,jpg,jpeg,svg}", {
  eager: true,
});

const getImages = (imageName) => {
  const matchedImage = Object.keys(images).find((key) =>
    key.includes(imageName)
  );
  return matchedImage ? images[matchedImage].default : null;
};

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const { addToWishlist } = useWishlist();
  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, "books");
      const booksQuery = query(booksCollection, orderBy(sortType, sortOrder));
      const booksSnapshot = await getDocs(booksQuery);
      const booksList = booksSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBooks(booksList);
    };

    fetchBooks();
  }, [sortType, sortOrder]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title
      ? book.title.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

  const showNoBooksMessage = searchTerm !== "" && filteredBooks.length === 0;
  return (
    <div className="book-page">
      <Aside />
      <div className="Booklist">
        <h1 className="Title">Book List</h1>
        <div className="search-sort">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <select value={sortType} onChange={handleSortChange}>
            <option value="createdAt">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="author">Sort by Author</option>
          </select>

          <select value={sortOrder} onChange={handleSortOrder}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
        {showNoBooksMessage ? (
          <div className="noFound">
            <h2>Book not found</h2>
          </div>
        ) : (
          <ul className="bookList">
            {filteredBooks.map((book) => (
              <li key={book.id}>
                <img
                  src={book.imageUrl || getImages(book.imageLink)}
                  alt={book.title}
                />
                <div className="bookDetails">
                  <h2>{book.title}</h2>
                  <p>Author: {book.author}</p>
                  <p>Pages: {book.pages}</p>
                  <p>Language: {book.language}</p>
                  <p>Year: {book.year}</p>
                  <a href={book.link}>More info</a>

                  <div className="button">
                    <button onClick={() => addToWishlist(book)}>
                      Add to Wishlist
                    </button>
                    <RatingStars bookId={book.id} initialRating={book.rating} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookList;
