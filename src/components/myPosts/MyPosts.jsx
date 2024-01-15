import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";

export default function MyPosts() {
  const uid = sessionStorage.getItem("uid");
  const [data, setData] = useState([]);
  const getData = async () => {
    const q = query(collection(db, "users", uid, "posts"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() , id : doc.id});
    });
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
          <div className="col-md-6">
            {data.map((blog, idx) => {
              return (
                <div className="blogFigure" key={idx}>
                  <h5>{blog.title}</h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
