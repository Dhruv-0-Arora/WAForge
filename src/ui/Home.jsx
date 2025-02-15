import React from "react";
import imageMask from "../assets/image.jpeg"; // The image used as text mask
import globePlane from "../assets/flight.png"; // The center image

export default function Home() {
    return (
        <div>
            {/* Space */}
            <div className="h-[5vh]"></div>

            {/* "ENVORA" with an image mask */}
            <h1
                className="flex justify-center align-center text-center text-[96px] font-bold select-none brightness-80"
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
            <div className="flex justify-center align-center h-auto">
                <img
                    src={globePlane}
                    alt="Earth with airplane"
                    className="max-w-[75vw] h-auto"
                />
            </div>

            {/* Tagline */}
            <p className="text-center text-3xl font-bold text-gray-500 font-bold">
                Your Guide to Sustainable Living
            </p>
        </div>
    );
}
