import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (book) => {
    const exist = wishlist.some((item) => item.id === book.id);
    if (!exist) {
      setWishlist((prevWishlist) => [...prevWishlist, book]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((book) => book.id !== id)
    );
  };

  const toggleWishlist = (book) => {
    const exist = wishlist.some((item) => item.id === book.id);
    if (exist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };
  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        wishlistCount: wishlist.length,
        removeFromWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
