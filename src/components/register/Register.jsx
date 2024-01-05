import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { auth , db} from "../../firebase.js";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function Register() {
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [password, setPassword] = useState(null);

  async function createNewUser(e) {
    try {
      e.preventDefault();
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(user);
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName ,
        lastName: lastName,
        email:email,
        timeStamp:serverTimestamp()
      });
      toast.success("New account is created");

    } catch (error) {
      const errorMessage = error.message;
      if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
        toast.error("This account is already exist ! Log in ");
      }
    }
  }

  return (
    <>
      <div className="container py-4">
        <form className="form" onSubmit={createNewUser}> 
        <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First name 
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last name 
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
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
