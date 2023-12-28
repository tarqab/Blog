import React from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="container-navbar w-100  d-flex justify-content-between container-fluid">
          <div className="left d-flex justify-content-center align-items-center gap-3 ">
            <div className="d-flex gap-2">
              <FontAwesomeIcon
                icon="fa-brands fa-facebook"
                color="white"
                cursor={"pointer"}
              />{" "}
              <FontAwesomeIcon
                icon="fa-brands fa-twitter"
                color="white"
                cursor={"pointer"}
              />{" "}
              <FontAwesomeIcon
                icon="fa-brands fa-linkedin"
                color="white"
                cursor={"pointer"}
              />{" "}
              <FontAwesomeIcon
                icon="fa-brands fa-instagram"
                color="white"
                cursor={"pointer"}
              />{" "}
              <FontAwesomeIcon
                icon="fa-brands fa-youtube"
                color="white"
                cursor={"pointer"}
              />{" "}
            </div>
          </div>
          <div className="right d-flex justify-content-center align-items-center gap-2 ">
            <div className="user">
              <Link to="/login">
                <button className="btn btn-success">Login</button>
              </Link>
            </div>
            <input
              type="email"
              className="form-control"
              id="search"
              placeholder="search"
            />
            <button className="btn btn-outline-dark">search</button>
          </div>
        </div>
      </div>
    </>
  );
}
