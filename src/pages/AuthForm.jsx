import React from "react";
import { Link } from "react-router-dom";
const AuthForm = ({ title, fields, handleSubmit, formClass }) => {
  return (
    <div className="loginPage">
      <div className="loginHeader"></div>
      <div className="loginMain">
        <div className="loginBanner">
          <img src="/src/assets/download (10).png" alt="" />
          <h1>Book social network</h1>
          <h2>{title}</h2>
        </div>
        <div className="line"></div>
        <div className={formClass}>
          <form className="inputs" onSubmit={handleSubmit}>
            {fields.map((field, index) => (
              <div key={index}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={field.placeholder}
                  required
                />
              </div>
            ))}
            <div className="acc-sub">
              <div className="submit">
                <button type="submit"></button>
              </div>
              <Link to="/register">Don't have account ?</Link>
            </div>
          </form>
        </div>
      </div>

      <div className="loginFooter">
        <div className="backControls">
          <div className="back">
            <a href="/">
              <span>
                <img
                  style={{ transform: "rotate(180deg)", width: "20px" }}
                  src="/src/assets/download (8).png"
                  alt=""
                />
              </span>{" "}
              Back to homepage
            </a>
          </div>
          <div className="text">
            <p>After you log on, you can add or edit books</p>
            <p>Just go to Manage books and click Edit buttons</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
