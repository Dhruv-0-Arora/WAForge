import React from "react";
import ReactDOM from "react-dom/client";
import "./styling/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import Home from "./ui/Home";
import PlaneTracker from "./ui/PlaneTracker";
import About from "./ui/About"; // Ensure this is imported

// Define routes
const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/tracker", element: <PlaneTracker /> },
    { path: "/about", element: <About /> }, // Ensure this exists
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);

reportWebVitals();