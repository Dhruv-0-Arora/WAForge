import React from "react";
import ReactDOM from "react-dom/client";
import "./styling/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";
import PlaneTracker from "./pages/PlaneTracker";
import About from "./pages/About"; // Ensure this is imported
import Evaluation from "./pages/Evaluation"; // Ensure this is imported

// Define routes
const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/tracker", element: <PlaneTracker /> },
    { path: "/about", element: <About /> }, // Ensure this exists
    { path: "/evaluation", element: <Evaluation /> }, // Ensure this exists 
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);

reportWebVitals();
