import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { PuffLoader } from "react-spinners";

export default function PostDetailsFromHome() {
  const location = useLocation();

  const { id, firstId  , time} = location.state;

  const [data, setData] = useState(null);

  //--------- Get Blog data ------------------

  const getPostDetails = async () => {
    const docRef = doc(db, "users", firstId, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    getPostDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(data);
  return (
    <>
      {data ? (
        <div className="container mt-2">
          <div className="dataFigure border rounded p-2">
            <h5>Title: {data.title}</h5>
            <h5>Category: {data.category}</h5>
            <h6>Added at : {time}</h6>
            <p className="post-text">{data.text}</p>
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
