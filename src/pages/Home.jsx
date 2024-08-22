import React, { act, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Styles/Home.css";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useWishlist } from "./WishContext";
import Cards from "./Cards";
import Aside from "./Aside";
import { useAuth } from "../Authcontext";
const images = import.meta.glob("../assets/images/*.{png,jpg,jpeg,svg}", {
  eager: true,
});

const getImage = (imageName) => {
  const matchedImage = Object.keys(images).find((key) =>
    key.includes(imageName)
  );
  return matchedImage ? images[matchedImage].default : null;
};

const Home = ({ limit = 8, one = 1, six = 4 }) => {
  const { currentUser } = useAuth();

  const [books, setBooks] = useState([]);
  const { addToWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState("allInOne");

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, "books");
      const booksQuery = query(booksCollection, orderBy("createdAt", "desc"));
      const booksSnapshot = await getDocs(booksQuery);
      const booksList = booksSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBooks(booksList);
    };

    fetchBooks();
  }, []);

  const getRandomBook = (books) => {
    if (books.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * books.length);
    return books[randomIndex];
  };
  const displayedBooks = limit ? books.slice(0, limit) : books;
  const todayDeal = six ? books.slice(0, six) : books;
  const OneBook = one ? [getRandomBook(books)] : books;
  return (
    <>
      <main className="mainContainer">
        <Aside handleTabClick={setActiveTab} />
        <div className="Container">
          <div className="mainArea">
            {activeTab === "allInOne" && (
              <>
                <h2>All in one Book store</h2>
                <div className="Books">
                  <ul className="main">
                    {displayedBooks.map((book) => (
                      <Cards
                        key={book.id}
                        book={book}
                        addToWishlist={addToWishlist}
                        getImage={getImage}
                        currentUser={currentUser}
                      ></Cards>
                    ))}
                  </ul>
                </div>
              </>
            )}
            {activeTab === "todaysDeal" && (
              <>
                <section className="Today">
                  <h2>Today's deal</h2>
                  <div className="Content">
                    <div className="tabContent">
                      <ul className="today">
                        {todayDeal.map((book) => (
                          <Cards
                            key={book.id}
                            book={book}
                            addToWishlist={addToWishlist}
                            getImage={getImage}
                            currentUser={currentUser}
                          />
                        ))}
                        {OneBook.map(
                          (book) =>
                            book && (
                              <li key={book.id} className="wrap">
                                <img src={getImage(book.imageLink)} alt="" />
                                <div className="bookDetails">
                                  <h2>{book.title}</h2>
                                  <span
                                    onClick={() => addToWishlist(book)}
                                    className="wishIcon"
                                  >
                                    <FontAwesomeIcon icon="fa-regular fa-heart" />
                                  </span>
                                </div>
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
