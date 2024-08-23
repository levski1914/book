import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "cypress-real-events/support";
import "@christianliebel/paint";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import BookList from "./pages/BookList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./Authcontext";
import { WishlistProvider } from "./pages/WishContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import "react-alice-carousel/lib/alice-carousel.css";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { playClickSound } from "./audio";
import Logout from "./pages/Logout";
import ManageBooks from "./pages/ManageBooks";
import WishList from "./pages/WishList";
import Search from "./pages/Search";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Paint from "./Windows/Paint/Paint";

library.add(fab, fas, far);

function App() {
  useEffect(() => {
    document.addEventListener("click", playClickSound);
    return () => {
      document.removeEventListener("click", playClickSound);
    };
  }, []);

  return (
    <AuthProvider>
      <WishlistProvider>
        <Router basename="/">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/search" element={<Search />} />
            <Route path="/paint" element={<Paint />} />

            <Route
              path="/manage-books"
              element={
                <ProtectedRoute>
                  <ManageBooks />
                </ProtectedRoute>
              }
            />

            <Route path="/wishlist" element={<WishList />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          <Footer />
          <ToastContainer />
        </Router>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
