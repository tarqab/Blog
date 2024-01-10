import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authContext } from "../context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { userContext } from "../context/userContext";
export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const [profileImg, setProfileImg] = useState(null);
  const [userName, setUserName] = useState(null);

  const { userUid } = useContext(userContext);
  const navigate = useNavigate();
  function logout() {
    toast("log out is successfully done");
    localStorage.removeItem("tkn");
    setToken(null);
    navigate("/login");
  }
  // console.log(token);
  console.log(userUid);

  const getSomeData = async () => {
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserName(docSnap.data().firstName);
      setProfileImg(docSnap.data().img);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    getSomeData();
  }, []);

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
            <div className="h-100" >
              {" "}
              <h6>Hello {userName}</h6>
            </div>
            {/* <div className="welcome h-100 d-flex  justify-content-center align-items-center " >
            
            </div> */}
          </div>
          <div className="right d-flex justify-content-center align-items-center gap-2 ">
            <div className="d-flex gap-2 w-100">
              {token ? (
                <div className="logout">
                  <Link to="/login">
                    <button onClick={logout} className="btn btn-danger ">
                      Log out
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="login">
                  <Link to="/login">
                    <button className="btn btn-success">Login</button>
                  </Link>
                </div>
              )}
              <div className="signUp">
                <Link to="/signUp">
                  <button className="btn btn-success ">Sign up</button>
                </Link>
              </div>
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
