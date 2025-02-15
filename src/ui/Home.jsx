import React from "react";
import "../util/home.css";
import imageMask from "../assets/image.jpeg"; // The image used as text mask
import globePlane from "../assets/flight.png"; // The center image

export default function Home() {
    return (
        <div className="flex items-center justify-center text-center bg-white">
            {/* "ENVORA" with an image mask */}
            <h1
                className="envora font-bold text-transparent hover:scale-120"
                style={{
                    backgroundImage: `url(${imageMask})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    webkitTextFillColor: "transparent",
                    webkitBackgroundClip: "text",
                    userSelect: "none",
                    filter: "brightness(0.8)",
                }}
            >
                ENVORA
            </h1>

            {/* Center image */}
            <div className="globalPlane h-auto">
                <img
                    src={globePlane}
                    alt="Earth with airplane"
                    className="globalPlaneImage"
                />
            </div>

            {/* Tagline */}
            <p className="tagline font-bold text-gray-700 font-bold">
                Your Guide to Sustainable Living
            </p>
        </div>
    );
}
