import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./Styles/Search.css";
import RatingStars from "../components/Rating";
import { useWishlist } from "./WishContext";
const images = import.meta.glob("../assets/images/*.{png,jpg,jpeg,svg}", {
  eager: true,
});

const getImage = (imageName) => {
  const matchedImage = Object.keys(images).find((key) =>
    key.includes(imageName)
  );
  return matchedImage ? images[matchedImage].default : null;
};

const Search = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, "books");
      const booksSnapshot = await getDocs(booksCollection);
      const booksList = booksSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBooks(booksList);
    };

    fetchBooks();
  }, []);

  const handleSearch = () => {
    const filtered = books.filter((book) =>
      book.title
        ? book.title.toLowerCase().includes(searchTerm.toLowerCase())
        : false
    );
    setFilteredBooks(filtered);
    setIsSearchClicked(true);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsSearchClicked(false);
  };

  const showNoFoundBooks = isSearchClicked && filteredBooks.length === 0;
  return (
    <>
      <div className="Search">
        <div className="aside search">
          <article className="aside-cards">
            <div className="aside-card-main">
              <h2>Search by any or all of the criteria below. </h2>
              <div className="search-input">
                <h3>All or part of the book name:</h3>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </div>
              <div className="btns">
                <div className="back btn">
                  <Link to="/">Back</Link>
                </div>
                <button className="srch btn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </article>
          <img
            style={{ width: "100px", height: "100px" }}
            src="./assets/Image-29.webp"
            alt=""
          />
        </div>
        <div className="searchPlace">
          {showNoFoundBooks ? (
            <div className="noFound">
              <h2>Book not found</h2>
            </div>
          ) : (
            <ul className="bookList">
              {filteredBooks.map((book) => (
                <li key={book.id}>
                  <img src={getImage(book.imageLink)} alt={book.title} />
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
                      <RatingStars
                        bookId={book.id}
                        initialRating={book.rating}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="watermark">
            <img src="./assets/shell32.dll-14-23-8.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
