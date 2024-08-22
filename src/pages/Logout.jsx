import React, { useEffect } from "react";
import { useAuth } from "../Authcontext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        navigate("/login");
      } catch (error) {
        console.error("Failed to logout", error);
      }
    };

    handleLogout();
  }, [logout, navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
