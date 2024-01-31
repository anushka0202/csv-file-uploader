import React, { useState } from "react";
import SideNav from "./SideNav";
import avatar from "./../assets/avatar.svg";
import bell from "./../assets/bell.svg";
import logo from "./../assets/blue-logo-and-company.svg";

const TopNav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };
  return (
    <div className="top-nav">
      {!isNavOpen && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button className="hamburger" onClick={toggleNav}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
              >
                <path
                  d="M1 1H17M1 13H17M1 7H17"
                  stroke="#231F20"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <img src={logo} alt="Logo" />
          </div>
          <div>
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
      )}

      <div className={`dropdown-content ${isNavOpen ? "" : "closed"}`}>
        <SideNav />
        <button className="close-btn" onClick={closeNav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M25.3424 14.6568L19.6855 20.3137M19.6855 20.3137L14.0287 14.6568M19.6855 20.3137L14.0287 25.9706M19.6855 20.3137L25.3424 25.9706"
              stroke="#999CA0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TopNav;
