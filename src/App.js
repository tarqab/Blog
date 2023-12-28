import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { firebaseConfig } from "./firebase.js"
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/fontawesome-free-regular";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./components/home/Home.jsx";
import Footer from "./components/footer/Footer.jsx"
import Layout from "./components/layout/Layout.jsx";
import Login from "./components/login/Login.jsx";


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
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={myRouter} ></RouterProvider>
    </>
  );
}
