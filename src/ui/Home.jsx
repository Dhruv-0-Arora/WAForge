import React from "react";
import "../styling/home.css";
import imageMask from "../assets/image.jpeg"; // The image used as text mask
import globePlane from "../assets/flight.png"; // The center image

export default function Home() {
    return (
        <div>
            {/* "ENVORA" with an image mask */}
            <h1
                className="envora font-bold select-none brightness-80"
                style={{
                    backgroundImage: `url(${imageMask})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    webkitTextFillColor: "transparent",
                    webkitBackgroundClip: "text",
                }}
            >
                ENVORA
            </h1>

            {/* Center image */}
            <div className="globalPlane h-auto">
                <img
                    src={globePlane}
                    alt="Earth with airplane"
                    className="max-w-[75vw] h-auto"
                />
            </div>

            {/* Tagline */}
            <p className="tagline text-3xl font-bold text-gray-700 font-bold">
                Your Guide to Sustainable Living
            </p>
        </div>
    );
}
