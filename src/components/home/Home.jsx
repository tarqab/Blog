import React, { useEffect, useState } from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { PuffLoader } from "react-spinners";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [track , setTrack] = useState("still");

  //---------------- Get data -----------------

  async function getAllBlogs() {
    let temp = [];
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach(async (doc) => {
      let firstDocId = doc.id;
      let name = doc.data().firstName + " " + doc.data().lastName;

      const querySnapshot = await getDocs(
        collection(db, "users", doc.id, "posts")
      );
      querySnapshot.forEach((doc) => {
        let addingDate = new Date(doc.data().addingTime.seconds * 1000);
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

        const tempTime = date + " " + month + " " + year;

        temp.push({
          ...doc.data(),
          id: doc.id,
          timeOfPost: tempTime,
          author: name,
          firstDocId: firstDocId,
        });
        setPosts(temp);

      });
    
    });

    setTrack("done")

   
  }
  useEffect(() => {
    getAllBlogs();
  }, [track]);

  console.log(posts);

  return (
    <>
      {posts != [] ? (
        <div className="home ">
          <div className="container-home">
            <div className="title-home mt-5">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="logo">
                      <h1 className="text-center">Blogger.Dev</h1>
                      <p className="text-center">
                        more blog you have, faster become famous
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row gy-3">
                  <div className="col-md-12 col-lg-4 ">
                    <div className="card-hero shadow-lg">
                      <img
                        className="w-100"
                        src={require("../../images/image-hero1.jpg")}
                        alt="heroImage"
                      />
                      <div className="text-card-hero shadow-lg">
                        <span className="category-min">Web</span>
                        <h6>How can you become a web developer</h6>
                        <p>
                          21 July, 2023 / <span> By Tareq </span>{" "}
                        </p>
                      </div>
                      <div className="layer-card-hero"></div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-4">
                    <div className="card-hero shadow-lg">
                      <img
                        className="w-100"
                        src={require("../../images/image-hero3.jpg")}
                        alt="heroImage"
                      />
                      <div className="text-card-hero shadow-lg">
                        <span className="category-min">PC</span>
                        <h6>How can you become a web developer</h6>
                        <p>
                          21 July, 2023 / <span> By Tareq </span>{" "}
                        </p>
                      </div>
                      <div className="layer-card-hero"></div>
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-4 ">
                    <div className="card-hero shadow-lg">
                      <img
                        className="w-100"
                        src={require("../../images/image-hero2.jpg")}
                        alt="heroImage"
                      />
                      <div className="text-card-hero ">
                        <span className="category-min">Mobile</span>
                        <h6>How can you become a web developer</h6>
                        <p>
                          21 July, 2023 / <span> By Tareq </span>{" "}
                        </p>
                      </div>
                      <div className="layer-card-hero"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container mt-5">
                <div className="row">
                  <div className="col-lg-9 col-md-12 blogs-flow">
                    <div className="blog-box row gy-3 ">
                      {posts.map((item) => {
                        return (
                          <Link
                            to="/postdetailsfromhome"
                            state={{
                              id: item.id,
                              firstId: item.firstDocId,
                              time: item.timeOfPost,
                            }}
                          >
                            <div
                              className="col-md-9 blog-texts border rounded"
                              key={item.id}
                            >
                              <div>
                                <span className="category-min">
                                  {item.category}
                                </span>
                                <h5>{item.title}</h5>
                                <p className="text-paragraph">{item.text}</p>
                                <p className="text-paragraph-writer">
                                  Added in : {item.timeOfPost} /{" "}
                                  <span> {item.author} </span>{" "}
                                </p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12">
                    <div className="d-flex flex-column">
                      <div className="search-middle">
                        <h5>Search</h5>
                        <div className="input-group mb-3">
                          <span
                            className="input-group-text bg-main"
                            id="basic-addon1"
                          >
                            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="search"
                            aria-label="Username"
                          />
                        </div>
                      </div>
                      <div className="recent-posts">
                        <h5>Recent Posts</h5>
                        <div className="d-flex gap-2 mb-1">
                          <img
                            src={require("../../images/image-web-dev.jpg")}
                            alt="recent-posts"
                            className="w-25 h-100"
                          />
                          <div>
                            {" "}
                            <h6 className="text-paragraph">
                              5 Beautiful buildings you need to before dying
                            </h6>
                            <p className="text-paragraph-writer">12 Jan 2020</p>
                          </div>
                        </div>
                        <div className="d-flex gap-2 mb-1">
                          <img
                            src={require("../../images/image-web-dev.jpg")}
                            alt="recent-posts"
                            className="w-25 h-100"
                          />
                          <div>
                            {" "}
                            <h6 className="text-paragraph">
                              5 Beautiful buildings you need to before dying
                            </h6>
                            <p className="text-paragraph-writer">12 Jan 2020</p>
                          </div>
                        </div>
                        <div className="d-flex gap-2 mb-1">
                          <img
                            src={require("../../images/image-web-dev.jpg")}
                            alt="recent-posts"
                            className="w-25 h-100"
                          />
                          <div>
                            {" "}
                            <h6 className="text-paragraph">
                              5 Beautiful buildings you need to before dying
                            </h6>
                            <p className="text-paragraph-writer">12 Jan 2020</p>
                          </div>
                        </div>
                        <div className="d-flex gap-2 mb-1">
                          <img
                            src={require("../../images/image-web-dev.jpg")}
                            alt="recent-posts"
                            className="w-25 h-100"
                          />
                          <div>
                            {" "}
                            <h6 className="text-paragraph">
                              5 Beautiful buildings you need to before dying
                            </h6>
                            <p className="text-paragraph-writer">12 Jan 2020</p>
                          </div>
                        </div>
                      </div>
                      <div className="category">
                        <h5>Popular Category</h5>
                        <ul>
                          <li>Web Development</li>
                          <li>Mobile Development</li>
                          <li>PC Skills</li>
                          <li>Server & Switch</li>
                          <li>Node JS</li>
                        </ul>
                      </div>
                    </div>
                  </div>
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
