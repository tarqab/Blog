import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Toaster } from "react-hot-toast";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Home from "./components/home/Home.jsx";
import Layout from "./components/layout/Layout.jsx";
import Login from "./components/login/Login.jsx";
import { AuthProvider } from "./components/context/authContext.js";
import RecentPosts from "./components/recentPosts/RecentPosts.jsx";
import ProtectedRoute from "./components/proctectedRoute/ProtectedRoute.jsx";
import Register from "./components/register/Register.jsx";
import { UserProvider } from "./components/context/userContext.js";
import NewPost from "./components/newPost/NewPost.jsx";
import MyPosts from "./components/myPosts/MyPosts.jsx";
import PostDetails from "./components/postDetails/PostDetails.jsx";
import PostDetailsFromHome from "./components/postDetailsFromHome/postDetailsFromHome.jsx";
import SearchProvider from "./components/context/searchContext.js";
import SearchResult from "./components/searchResult/SearchResult.jsx";

library.add(
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
  faYoutube,
  faMagnifyingGlass
);

const myRouter = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/recentPosts",
        element: (
          <ProtectedRoute>
            <RecentPosts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/newPost",
        element: (
          <ProtectedRoute>
            <NewPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myPosts",
        element: (
          <ProtectedRoute>
            <MyPosts />
          </ProtectedRoute>
        ),
      },

      {
        path: "/postDetails/:id",
        element: (
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/postdetailsfromhome",
        element: (
          <ProtectedRoute>
            <PostDetailsFromHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/searchResult",
        element: (
          <ProtectedRoute>
            <SearchResult />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signUp",
        element: <Register />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <SearchProvider>
        <UserProvider>
          <AuthProvider>
            <RouterProvider router={myRouter}></RouterProvider>
            <Toaster />
          </AuthProvider>
        </UserProvider>
      </SearchProvider>
    </>
  );
}
