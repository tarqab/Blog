import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc  } from "firebase/firestore";
import { db } from "../../firebase";
import { PuffLoader } from "react-spinners";
import toast from "react-hot-toast";

export default function PostDetails() {
  const { id } = useParams();
  const uid = sessionStorage.getItem("uid");
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [clicked, setClicked] = useState("d-none");
  const [updateButtonFirst, setUpdateButtonFirst] = useState("d-block");
  const [updateButtonSecond, setUpdateButtonSecond] = useState("d-none");
  const navigate = useNavigate();

  //-----------------------------
  const getPostDetails = async () => {
    const docRef = doc(db, "users", uid, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  //-------- update -----------

  const toggleButton = async () => {
    setClicked("d-block");
    setUpdateButtonFirst("d-none");
    setUpdateButtonSecond("d-block");
  };

  const updatePost = async () => {
    const post = doc(db, "users", uid, "posts", id);

    await updateDoc(post, {
      title: title,
      category: category,
      text: text,
    });

    setUpdateButtonSecond("d-none");
    setClicked("d-none");

    setUpdateButtonFirst("d-block");
    window.location.reload();
  };
  
  const deletePost = async() => {
    await deleteDoc(doc(db, "users", uid, "posts", id));
    toast.success("The Blog is deleted")
    navigate("/myPosts")
  }
  useEffect(() => {
    getPostDetails();
  }, []);
  return (
    <>
      {data ? (
        <div className="container p-4">
          <div className="row">
            <div className="col-md-12" key={data.id}>
              <div className="dataFigure border p-2">
                <h5>Title: {data.title}</h5>
                <h5>Category: {data.category}</h5>
                <p>Text: {data.text}</p>
              </div>
              <div className={`update mt-2 ${clicked}`}>
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="enter post title"
                      defaultValue={data.title}
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
                      defaultValue={data.category}
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
                      defaultValue={data.text}
                      style={{ minHeight: "150px" }}
                    />
                  </div>
                </form>
              </div>
              <div className="d-flex gap-1">
                <button
                  onClick={toggleButton}
                  className={`btn btn-success mt-2 ${updateButtonFirst}`}
                >
                  Update
                </button>

                <button
                  onClick={updatePost}
                  className={`btn btn-primary mt-2 ${updateButtonSecond}`}
                >
                  Done
                </button>
                <button onClick={deletePost} className="btn btn-danger mt-2">Delete</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center ">
          <PuffLoader color="#36d7b7" />
        </div>
      )}
    </>
  );
}
