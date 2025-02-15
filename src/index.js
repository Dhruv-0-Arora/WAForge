import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./ui/App";
import About from "./ui/About";
import Evaluator from "./ui/Evaluator";
import PlaneTracker from "./ui/PlaneTracker";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/about", element: <About /> },
    { path: "/evaluator", element: <Evaluator /> },
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
