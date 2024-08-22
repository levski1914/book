import React, { useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import { toast } from "react-toastify";

const EditAccount = ({ currentUser, onClose }) => {
  const [username, setUsername] = useState(currentUser.name);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleUpdate = async () => {
    try {
      const userDoc = doc(db, "users", currentUser.uid);
      await updateDoc(userDoc, { name: username });
      if (newPassword) {
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          currentPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);

        await updatePassword(auth.currentUser, newPassword);
      }

      toast.success("password changed successfuly");
      onClose();
    } catch (error) {
      toast.error("Error updating profile" + error.message);
    }
  };
  return (
    <div>
      <h2>Редактиране на акаунт</h2>
      <label>
        Име:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Текуща парола:
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </label>
      <label>
        Нова парола:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <button onClick={handleUpdate}>Запази промените</button>
      <button onClick={onClose}>Отказ</button>
    </div>
  );
};

export default EditAccount;
