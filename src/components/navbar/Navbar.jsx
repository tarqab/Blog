/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authContext } from "../context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { userContext } from "../context/userContext";
import { searchContext } from "../context/searchContext";
export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const [profileImg, setProfileImg] = useState(null);
  const [userName, setUserName] = useState(null);
  const [searchedPost, setSearchedPost] = useState("");

  const { userUid, setUserUid } = useContext(userContext);
  const navigate = useNavigate();
  const { searchBlog, blogsMatched } = useContext(searchContext);

  //------------------------

  function logout() {
    toast.success("Log out is successfully done");
    sessionStorage.removeItem("tkn");
    sessionStorage.removeItem("uid");
    setToken(null);
    setUserUid(null);
    navigate("/login");
  }

  const getSomeData = async () => {
    if (userUid) {
      const docRef = doc(db, "users", userUid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setUserName(docSnap.data().firstName);
        setProfileImg(docSnap.data().img);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } else {
      setUserName(null);
      setProfileImg(null);
    }
  };
  useEffect(() => {
    setUserUid(sessionStorage.getItem("uid"));
    console.log("useEffect Navbar");
    getSomeData();
  }, [userUid]);


  return (
    <>
      <div className="navbar">
        <div className="container-navbar w-100  d-flex  container-fluid">
          <div className="links">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid ">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mx-auto  mb-2 mb-lg-0 gap-1 fs-5">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item signUp-navbar">
                      <Link className="nav-link" to="/signUp">
                        Sign up
                      </Link>
                    </li>
                    <li className="nav-item signIn-navbar">
                      <Link className="nav-link" to="/login">
                        Sign in
                      </Link>
                    </li>
                    {token ? (
                      <li className="nav-item">
                        <button onClick={logout} className="nav-link" to="">
                          Log out
                        </button>
                      </li>
                    ) : (
                      ""
                    )}

                    <li className="nav-item">
                      <Link className="nav-link" to="/myPosts">
                        My posts
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/newPost">
                        Add a new post
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>

          <div className="right d-flex justify-content-center align-items-center gap-2  ">
            <div className="d-flex gap-2 ">
             
              {token ? (
                <div className="d-flex ">
                  <img
                    src={profileImg}
                    alt="profileImg"
                    className="profileImg"
                  />

                  <div className="logout">
                    <Link to="/login">
                      <button
                        onClick={logout}
                        className="btn btn-danger buttons-navbar "
                      >
                        Log out
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="login">
                  <Link to="/login">
                    <button className="btn btn-success buttons-navbar">
                      Login
                    </button>
                  </Link>
                </div>
              )}
              <div className="signUp ">
                <Link to="/signUp">
                  <button className="btn btn-success buttons-navbar">
                    Sign up
                  </button>
                </Link>
              </div>
            </div>

            <input
              type="email"
              className="form-control"
              id="search"
              placeholder="search"
              onChange={(e) => setSearchedPost(e.target.value)}
            />
            <Link to="/searchResult" 
            
            //  state={{ 
            //   blogsMatched: blogsMatched,
              
            // }}
            >
              <button
                onClick={() => {
                  searchBlog(searchedPost);
                }}
                className="btn btn-outline-dark buttons-navbar"
              >
                search
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
