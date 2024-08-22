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
              <img src="../../images/download (5).png" alt="" />
            </div>
            <div className="aside-card-main">
              <div className="aside-row">
                <img
                  src="../../images/Windows icons - PNG/rundll32.exe_14_100-4.png"
                  alt=""
                />
                <Link to="/manage-books">Add new book</Link>
              </div>
              <div className="aside-row">
                <img src="../../images/download (6).png" alt="" />
                <Link to="/books">List of books</Link>
              </div>

              <div className="aside-row">
                <img src="../../images/download (7).png" alt="" />
                <Link to="/manage-books">Manage books</Link>
              </div>
              <div className="aside-row">
                <img
                  src="../../images/Windows Icons - PNG/shell32.dll_14_269-4.png"
                  alt=""
                />
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
          <img src="../../images/download (5).png" alt="" />
        </div>
        <div className="aside-card-main">
          <div className="aside-row">
            <img
              src="../../images/Windows icons - PNG/rundll32.exe_14_100-4.png"
              alt=""
            />
            <Link to="/" onClick={() => handleTabClick("allInOne")}>
              All in one store
            </Link>
          </div>
          <div className="aside-row">
            <img src="../../images/download (6).png" alt="" />
            <Link to="/" onClick={() => handleTabClick("todaysDeal")}>
              Today's deal
            </Link>
          </div>
          <div className="aside-row">
            <img src="../../images/download (6).png" alt="" />
            <Link to="/">Most popular books</Link>
          </div>

          <div className="aside-row">
            <img
              src="../../images/Windows icons - PNG/shdoclc.dll_14_191-7.png"
              alt=""
            />
            <Link to="/wishlist">Whishlist ({wishlistCount})</Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Aside;
