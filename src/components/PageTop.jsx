import React from "react";
import avatar from "./../assets/avatar.svg";
import bell from "./../assets/bell.svg";

const PageTop = ({ title }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px",
        width: "100%",
      }}
    >
      <div className="title">{title}</div>
      <div className="page-top-icons">
        <img
          style={{ width: "30px", height: "30px", margin: "10px" }}
          src={bell}
          alt="bell"
        />
        <img
          style={{ width: "30px", height: "30px", margin: "10px" }}
          src={avatar}
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default PageTop;
