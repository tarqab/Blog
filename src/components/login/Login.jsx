import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from "../../firebase.js";
export default function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        toast.success("Successfully created!");
      })
      .catch((error) => {
        toast.error("error!");
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
              <label htmlFor="email" className="form-label">
                First Name
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="First Name"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                First Name
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Last Name"
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
