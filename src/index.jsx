import React from "react";
import ReactDOM from "react-dom/client";
import "./styling/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import Home from "./ui/Home";
import About from "./ui/About";
import PlaneTracker from "./ui/PlaneTracker";

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/tracker", element: <PlaneTracker /> },

]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
