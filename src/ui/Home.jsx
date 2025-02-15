import React from "react";
import imageMask from "../assets/image.jpeg"; // The image used as text mask
import globePlane from "../assets/flight.png"; // The center image

export default function Home() {
    return (
        <div className="flex">
            <div className="inline-flex flex-col items-center justify-between min-h-screen w-auto mx-auto">
                {/* Top spacing */}
                <div className="h-[5vh]" />

                {/* "ENVORA" with an image mask */}
                <h1
                    className=" flex justify-center items-center text-center text-[64px] font-bold select-none brightness-80 md:text-[96px]"
                    style={{
                        backgroundImage: `url(${imageMask})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        WebkitTextFillColor: "transparent",
                        WebkitBackgroundClip: "text",
                    }}
                >
                    ENVORA
                </h1>

                {/* Center image */}
                <div className="flex justify-center items-center h-auto">
                    <img
                        src={globePlane}
                        alt="Earth with airplane"
                        className="max-w-[85vw] h-auto md:max-w-[700px]"
                    />
                </div>

                {/* Tagline */}
                <p className="text-center text-3xl md:text-4xl font-bold text-gray-500 px-5">
                    Your Guide to Sustainable Living
                </p>

                <div className="h-[5vh]"></div>
            </div>
        </div>
    );
}
