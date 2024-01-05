import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { auth, db , storage } from "../../firebase.js";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



export default function Register() {
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [password, setPassword] = useState(null);
  const [repassword, setRePassword] = useState(null);
  const [file , setFile] = useState("")
  const userDataObj = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    repassword: repassword,
  };
 

  useEffect(()=>{
  const uploadFile = () => {
    const storageRef = ref(storage, file.name);
    
const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default: 
        break
    }
    
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);

  }


  } , [file])
  async function createNewUser(e) {
    try {
      e.preventDefault();
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(user);
      await setDoc(doc(db, "users", user.uid), {
        firstName: userDataObj.firstName,
        lastName: userDataObj.lastName,
        email: userDataObj.email,
        timeStamp: serverTimestamp(),
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
          <div className="mb-3">
            <label htmlFor="repassword" className="form-label">
              Repeat the Password
            </label>
            <input
              type="repassword"
              className="form-control"
              id="repassword"
              placeholder="Enter your password"
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          <div className="mb-3"  >
            <label style={{display:"block" , marginBottom:"10px"}} htmlFor="upload">
              Upload you profile Photo
            </label>
            <input id="upload"
            type="file" 
            onChange={(e) => setFile(e.target.files[0])}
            >


            </input>
          </div>
          <button className="btn btn-success" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}
