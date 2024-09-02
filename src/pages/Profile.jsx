// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authcontext";
import { Link } from "react-router-dom";
import EditAccount from "./EditAccount";
import Aside from "./Aside";
import "./Styles/Profile.css";
const Profile = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const userDoc = doc(db, "users", currentUser.uid);
      await deleteDoc(userDoc);
      alert("Акаунтът е успешно изтрит!");
      navigate("/login");
    } catch (error) {
      alert("Грешка! " + error.message);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser) {
        try {
          console.log("Fetching data for user with uid:", currentUser.uid);
          const userDoc = doc(db, "users", currentUser.uid);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            console.log("User data:", userSnapshot.data());
            setUser(userSnapshot.data());
          } else {
            console.log("No such document!");
            setError("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError(
            "Failed to fetch user data. Please check your internet connection."
          );
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    };

    fetchUser();
  }, [currentUser, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleShowWarning = () => {
    const audio = document.getElementById("error-sound");
    audio.play();
    setShowWarning(true);
  };
  const handleCloseEdit = () => setEditMode(false);
  const handleCloseDelete = () => setDeleteMode(false);

  return (
    <>
      <audio
        id="error-sound"
        src="../../Windows XP Critical Stop.mp3"
        preload="auto"
      ></audio>
      <div className="Profile">
        <Aside />

        <div className="profile-main">
          <div className="header-profile">
            <img src="/src/assets/shell32.dll-14-269-4.png" alt="#" />
            {/* <img src="../../images/shell" alt="#" /> */}
            <p>User Accounts</p>
          </div>

          <div className="Tasks">
            <h1>Pick a Task...</h1>
            <ul>
              <li>
                <Link to="/logout">
                  <img src="/book/src/assets/download-(8).png" alt="" />{" "}
                  <span>Change an account</span>
                </Link>
              </li>
              <li onClick={() => setEditMode(true)}>
                <img src="/book/src/assets/" alt="" />{" "}
                <span>Edit an account</span>
              </li>
              <li onClick={handleShowWarning}>
                <img src="/book/src/assets/shell32.dll-14-32-7.png" alt="" />
                <span>Delete an account</span>
              </li>
            </ul>
            {showWarning && (
              <div className="warning">
                <div className="title-bar warning-bar">
                  <p>Warning</p>
                  <button
                    className="close"
                    onClick={() => setShowWarning(false)}
                  ></button>
                </div>
                <div className="warning-body ">
                  <div className="message">
                    <img
                      src="/book/src/assets/user32.dll-14-103-6.png"
                      alt=""
                    />
                    <p>Are you sure you want to delete this account?</p>
                  </div>
                  <button onClick={handleDelete}>Delete!</button>
                </div>
              </div>
            )}
            <h1>Your profile details</h1>
            {user ? (
              <div>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
              </div>
            ) : (
              <p>User not found</p>
            )}
          </div>
        </div>
      </div>
      {editMode && (
        <div className="modal">
          <EditAccount currentUser={currentUser} onClose={handleCloseEdit} />
        </div>
      )}
    </>
  );
};

export default Profile;
