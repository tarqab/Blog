import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { searchContext } from "../context/searchContext";

export default function SearchResult() {
  const { blogsMatched } = useContext(searchContext);

  console.log(blogsMatched);

  return (
    <>
      {blogsMatched ? (
        <div className="container mt-2">
            <h3>Results of Search: <span>{blogsMatched?.length=== 0 ? 0 : ""}</span></h3>
          <div className="row gy-2">
            {blogsMatched.map((item) => {
              return (
                <div key={item.id} className="col-md-12">
                  <div className=" border rounded p-2">
                    <h5>Title: {item.title}</h5>
                    <h5>Category: {item.category}</h5>
                    {/* <h6>Added at : {time}</h6> */}
                  </div>
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
