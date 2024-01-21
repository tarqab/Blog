import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { PuffLoader } from "react-spinners";
import toast from "react-hot-toast";
import "./postDetails.css";

export default function PostDetails() {
  const { id } = useParams();
  const uid = sessionStorage.getItem("uid");
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [timeInSeconds, setTimeInSeconds] = useState(0);

  const [clicked, setClicked] = useState("d-none");
  const [updateButtonFirst, setUpdateButtonFirst] = useState("d-block");
  const [updateButtonSecond, setUpdateButtonSecond] = useState("d-none");
  const [confirmed, setConfirmed] = useState("d-none");
  const [time, setTime] = useState(null);
  const navigate = useNavigate();

  //-----------------------------
  const getPostDetails = async () => {
    console.log("1");
    const docRef = doc(db, "users", uid, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data());
     
    } else {
      console.log("No such document!");
    }
    setTitle(data?.title);
    setCategory(data?.category);
    setText(data?.text);
    console.log(data?.addingTime.seconds);
    // setTimeInSeconds(data?.addingTime.seconds);
  };

  //-------- update -----------

  const toggleButton = async () => {
    setClicked("d-block");
    setUpdateButtonFirst("d-none");
    setUpdateButtonSecond("d-block");
  };

  const updatePost = async (e) => {
    e.preventDefault();
    const post = doc(db, "users", uid, "posts", id);
    await updateDoc(post, {
      title: title,
      category: category,
      text: text,
    });
    getPostDetails();
    setUpdateButtonSecond("d-none");
    setClicked("d-none");

    setUpdateButtonFirst("d-block");
  };

  const deletePost = async () => {
    await deleteDoc(doc(db, "users", uid, "posts", id));
    toast.success("The Blog is deleted");
    navigate("/myPosts");
  };

  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds

  const timeOfPost = () => {
   

    console.log(data?.addingTime.seconds);
    let addingDate = new Date(data?.addingTime.seconds * 1000);
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let year = addingDate.getFullYear();
    let month = months[addingDate.getMonth()];
    let date = addingDate.getDate();
    let hour = addingDate.getHours();
    let min = addingDate.getMinutes();
    //const sec = addingDate.getSeconds();
    if (min == 0) {
      min = min + "0"
    }

    const temp = date + " " + month + " " + year + " " + hour + ":" + min  ;

    setTime(temp);
  };

  //------------- useEffect ---------------
  useEffect(() => {
    getPostDetails();
    timeOfPost();
  }, [data?.addingTime.seconds]);

  return (
    <>
      {data ? (
        <div className="container p-4 ">
          <div className="row">
            <div className="col-md-12" key={data.id}>
              <div className="dataFigure border rounded p-2">
                <h5>Title: {data.title}</h5>
                <h5>Category: {data.category}</h5>
                <h6>Added at : {time}</h6>
                <p className="post-text">{data.text}</p>
              </div>
              <div className={`update mt-2 ${clicked}`}>
                <form onSubmit={updatePost}>
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
                  <button
                    type="submit"
                    className={`btn btn-primary mt-2 ${updateButtonSecond}`}
                  >
                    Update
                  </button>
                </form>
              </div>
              <div className="d-flex gap-1">
                <button
                  onClick={toggleButton}
                  className={`btn btn-primary mt-2 ${updateButtonFirst}`}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setConfirmed("d-block");
                  }}
                  className="btn btn-danger mt-2"
                >
                  Delete
                </button>
              </div>
              <div className={`${confirmed}`}>
                <div className="p-2 w-50 mt-3 d-flex justify-content-center align-items-center shadow-lg">
                  <h4>Do you want to delete it ?</h4>
                </div>
                <div className="d-flex gap-1  mt-2 w-50 mt-3 d-flex justify-content-center align-items-center ">
                  <button
                    onClick={deletePost}
                    className="btn btn-success d-block"
                  >
                    yes
                  </button>
                  <button
                    onClick={() => {
                      setConfirmed("d-none");
                    }}
                    className="btn btn-danger d-block "
                  >
                    No
                  </button>
                </div>
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
