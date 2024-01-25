import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../../firebase";

export const searchContext = createContext();

export default function SearchProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [blogsMatched, setBlogsMatched] = useState([]);

  const [track, setTrack] = useState("still");
  const [trackSecond , setTrackSecond] = useState("still")

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

    setTrack("done");
  }

  //------------- search Function --------
  const searchBlog = (searchedWord) => {
   
    let foundedBlogs = [];
    getAllBlogs();
    posts.forEach((item) => {
      if (item.title?.toLowerCase().includes(searchedWord.toLowerCase())) {
        
        foundedBlogs.push(item);
      }
      

    });
    setBlogsMatched(foundedBlogs);

    setTrackSecond("done");
  };

  //------------------------
  useEffect(() => {
    getAllBlogs();
    searchBlog();
  }, [track , trackSecond]);

  console.log("from search", posts);

  return <searchContext.Provider value={{searchBlog , blogsMatched}}>{children}</searchContext.Provider>;
}
