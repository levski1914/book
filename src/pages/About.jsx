import React from "react";
import "./Styles/About.css";
import Aside from "./Aside";
const About = () => {
  return (
    <>
      <div className="aboutPage">
        <Aside />
        <div className="about-container">
          <h1>About Us</h1>
          <p>
            Welcome to Book Social Network, your number one source for all
            things books. I've dedicated to providing you the very best of book
            recommendations, with an emphasis on user reviews, ratings, and
            social interactions.
          </p>
          <p>
            Founded in 2024 by Georgi Dimitrov, Book Social Network has come a
            long way from its beginnings. When I first started out, my passion
            for books drove him to start my own business.
          </p>
          <p>
            I hope you enjoy our platform as much as I enjoy offering it to you.
            If you have any questions or comments, please don't hesitate to
            contact us.
          </p>
          <p>
            Sincerely,
            <br />
            Georgi Dimitrov, Founder
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
