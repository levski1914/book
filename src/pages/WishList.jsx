import React, { useState } from "react";
import "./Styles/WishList.css";
import { useWishlist } from "./WishContext";
import Aside from "./Aside";
const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <>
      <div className="wishPage">
        <Aside />
        <div className="wishList">
          <h1>Wishlist</h1>

          <div
            className="mainArea"
            style={{
              maxWidth: "1300px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            {wishlist.length === 0 ? (
              <p>No Products Added To The Wishlist</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Product name</th>
                    <th>Author</th>
                    <th>Uploaded</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlist.map((book) => (
                    <tr key={book.id} style={{ border: "1px solid" }}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.createdAt?.toDate().toDateString()}</td>
                      <td>
                        <button onClick={() => removeFromWishlist(book.id)}>
                          remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
