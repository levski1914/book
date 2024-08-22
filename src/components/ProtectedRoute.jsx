import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../Authcontext";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    if (!currentUser && !notified) {
      toast.error("Must to be logged/registered");
      setNotified(true);
    }
  }, [currentUser, notified]);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
