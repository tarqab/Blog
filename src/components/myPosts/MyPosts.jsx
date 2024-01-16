import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";

export default function MyPosts() {
  const uid = sessionStorage.getItem("uid");
  const [data, setData] = useState([]);
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
    console.log(data);
  }, []);

  return (
    <>
      <div className="container">
        <h2>My Posts</h2>
        <div className="row">
          {data.map((blog, idx) => {
            return (
              <div className="col-md-6 gy-1" key={idx}>
                <div className="blogFigure shadow  p-2">
                  <h5>{blog.title}</h5>
                  <h5>{blog.category}</h5>
                  <p>{blog.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
