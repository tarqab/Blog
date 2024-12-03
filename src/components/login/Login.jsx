import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext.js";
import { userContext } from "../context/userContext.js";
export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const { setToken } = useContext(authContext);
  const { userUid, setUserUid } = useContext(userContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setUserUid(user.uid);
        sessionStorage.setItem("uid", user.uid);
        toast.success("Successfully logged in!");
        setToken(user.accessToken);
        sessionStorage.setItem("tkn", user.accessToken);
        console.log(userUid);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Error! Check Your Password or E-mail");
        console.log(error.code);
        console.log(error.message);
      });
  };
  return (
    <>
      <div className="container py-2">
        <div className="row">
          <form className="form" onSubmit={handleLogin}>
            <div className="mb-3">
              <p>
                For testing there is made account yo can use it <br />
                mail: test@gmail.com <br /> password: 123456
              </p>

              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-success" type="submit">
              Log in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
