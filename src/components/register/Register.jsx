import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const auth = getAuth();

  function createNewUser(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast.success("New account is created");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        toast.error("Error ! ");
      });
  }

  return (
    <>
      <div className="container py-4">
        <form className="form" onSubmit={createNewUser}>
          <div className="mb-3">
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
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}
