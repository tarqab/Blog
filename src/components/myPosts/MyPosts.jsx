import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";

export default function MyPosts() {
  const uid = auth.currentUser?.uid;
  const [data, setData] = useState(null);
  const getData = async () => {
    const q = query(collection(db, "users", uid, "posts"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const res = doc.data();
      return res;
    });
  };

  useEffect(() => {
    const response = getData();
    // setData(getData());
    console.log(response);
  }, []);

  return (
    <>
      <div className="container">
        <h2>My Posts</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="blogFigure">
              <h5></h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
