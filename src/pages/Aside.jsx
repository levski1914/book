import React from "react";
import "./Styles/Aside.css";
import { Link } from "react-router-dom";
import { useWishlist } from "./WishContext";
import { useAuth } from "../Authcontext";
const Aside = ({ handleTabClick }) => {
  const { wishlistCount } = useWishlist();
  const { addToWishlist } = useWishlist();
  const { currentUser } = useAuth();
  return (
    <div className="aside">
      {currentUser ? (
        <>
          <article className="aside-cards">
            <div className="aside-card-header">
              <h2>Book Network</h2>
              <img src="./assets/download-(5).png" alt="" />
            </div>
            <div className="aside-card-main">
              <div className="aside-row">
                <img src="./assets/rundll32.exe-14-100-4.png" alt="" />
                <Link to="/manage-books">Add new book</Link>
              </div>
              <div className="aside-row">
                <img src="./assets/download-(6).png" alt="" />
                <Link to="/books">List of books</Link>
              </div>

              <div className="aside-row">
                <img src="./assets/download-(7).png" alt="" />
                <Link to="/manage-books">Manage books</Link>
              </div>
              <div className="aside-row">
                <img src="./assets/shell32.dll-14-269-4.png" alt="" />
                <Link to="/profile">User account</Link>
              </div>
            </div>
          </article>
        </>
      ) : (
        <></>
      )}

      <article className="aside-cards">
        <div className="aside-card-header">
          <h2>Categories</h2>
          <img src="./assets/download-(5).png" alt="" />
        </div>
        <div className="aside-card-main">
          <div className="aside-row">
            <img src="./assets/rundll32.exe-14-100-4.png" alt="" />
            <Link to="/" onClick={() => handleTabClick("allInOne")}>
              All in one store
            </Link>
          </div>
          <div className="aside-row">
            <img src="./assets/download-(6).png" alt="" />
            <Link to="/" onClick={() => handleTabClick("todaysDeal")}>
              Today's deal
            </Link>
          </div>
          <div className="aside-row">
            <img src="./assets/download-(6).png" alt="" />
            <Link to="/">Most popular books</Link>
          </div>

          <div className="aside-row">
            <img src="./assets/shdoclc.dll-14-191-7.png" alt="" />
            {/* <img src="/src/assets/shdoclc.dll_14_191-7.png" alt="" /> */}
            {/* <img src="../assets/" alt="" /> */}
            <Link to="/wishlist">Whishlist ({wishlistCount})</Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Aside;
