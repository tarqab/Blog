import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Footer() {
  return (
    <>
      <div className="footer bg-black w-100 mt-5">
        <div className="container d-flex justify-content-center align-items-center ">
          <div className="footer-container py-5 d-flex flex-column  align-items-center">
            <h2 className="text-center text-white">Blogger.Dev</h2>
            <p className="text-center text-logo">
              more blog you have, faster become famous
            </p>
            <p className="text-white text-center w-75 mt-1">
              Blogger.Dev is a platform for Developers around the word to share
              their Skills and experiences and to get it in the same way
            </p>
            <div className="icons-footer d-flex gap-2">
              <FontAwesomeIcon
                className="icons-footer"
                icon="fa-brands fa-facebook"
                color="white"
                cursor={"pointer"}
              />{" "}
              <FontAwesomeIcon
                className="icons-footer"
                icon="fa-brands fa-twitter"
                color="white"
                cursor={"pointer"}
              />{" "}
              <FontAwesomeIcon
                className="icons-footer"
                icon="fa-brands fa-linkedin"
                color="white"
                cursor={"pointer"}
              />{" "}
              <FontAwesomeIcon
                className="icons-footer"
                icon="fa-brands fa-instagram"
                color="white"
                cursor={"pointer"}
              />{" "}
              <FontAwesomeIcon
                className="icons-footer"
                icon="fa-brands fa-youtube"
                color="white"
                cursor={"pointer"}
              />{" "}
            </div>
            <div className="subscribe mt-3 w-75  d-flex justify-content-between gap-1">
              <input
                className="p-2 w-100 "
                placeholder="Enter Your email address"
                type="email"
              />
              <button className="subscribe-btn d-flex align-items-center">
                Subscribe
                <FontAwesomeIcon
                  icon="fa-regular fa-envelope-open"
                  className="ms-2 fs-5"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
