import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import "./myPosts.css";
export default function MyPosts() {
  const uid = sessionStorage.getItem("uid");
  const [data, setData] = useState([]);

  // ---------- getData Function ----------
  const getData = async () => {
    const q = query(collection(db, "users", uid, "posts"));
    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    setData(arr);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data ? (
        <div className="container p-2"> 
          <h2>My Posts</h2>
          <div className="row">
            {data.map((blog) => {
              return (
                <div className="col-md-6 gy-2" key={blog.id}>
                  <Link to={`/postDetails/${blog.id}`}>
                    {" "}
                    <div className="blogFigure border rounded  p-2">
                      <h5>{blog.title}</h5>
                      <h5>{blog.category}</h5>
                      <p>{blog.text}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
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
