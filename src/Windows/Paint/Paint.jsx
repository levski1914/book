import React from "react";
import Aside from "../../pages/Aside";
import "@christianliebel/paint";
import "./Paint.css";
const Paint = () => {
  return (
    <>
      <div className="paintPage">
        <Aside />
        <paint-app willReadFrequently="true" class="paint">
          {" "}
        </paint-app>
        <img src="../../" alt="" />
      </div>
    </>
  );
};

export default Paint;
