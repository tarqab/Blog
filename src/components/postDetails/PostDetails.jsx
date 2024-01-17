import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { PuffLoader } from "react-spinners";

export default function PostDetails() {
  const { id } = useParams();
  const uid = sessionStorage.getItem("uid");
  const [data, setData] = useState(null);

  const getPostDetails = async () => {
    const docRef = doc(db, "users", uid, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getPostDetails();
  }, []);
  return (
    <>
      {data ? (
        <div className="container p-4">
          <div className="row">
            <div className="col-md-12" key={data.id}>
              <div className="dataFigure p-2">
                <h5>{data.title}</h5>
                <h5>{data.category}</h5>
                <p>{data.text}</p>
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
