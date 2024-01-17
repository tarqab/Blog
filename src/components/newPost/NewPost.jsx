import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import { toast } from 'react-hot-toast';


export default function NewPost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
 
  const uid = auth.currentUser.uid;
  const newPostObj = {
    title: title,
    category: category,
    text: text,
  };
  const addNewPost = async(e) => {
    e.preventDefault();
    const posts = collection(db, "users", uid, "posts");
    const docRef = await addDoc(posts, {
     title:newPostObj.title,
     category:newPostObj.category, 
     text:newPostObj.text,
    });
   toast.success("New Blog added")
   
  }
useEffect(()=>{
  // console.log(uid);

}, [])


  return (
    <>
      <div className="container py-2">
        <h5 className="text-center">New Post</h5>
        <form onSubmit={addNewPost} >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="enter post title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="enter post category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Post text
            </label>
            <textarea
              type="text"
              className="form-control"
              id="firstName"
              placeholder="enter post text"
              onChange={(e) => setText(e.target.value)}
              style={{ minHeight: "150px" }}
            />
          </div>
          <button type="submit" className="btn btn-success">Add new Blog</button>
        </form>
      </div>
    </>
  );
}
