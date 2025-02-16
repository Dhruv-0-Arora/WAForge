import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "../styling/home.css";
import imageMask from "../assets/image.jpeg"; // Image used as text mask
import globePlane from "../assets/flight.png"; // Center image

// -- The OLD UI (ENVORA with plane) --
function OldUI() {
  return (
    <div className="fade-in">
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

// -- The NEW UI (card-based layout) --
function NewUI() {
  return (
    <div className="fade-in">
      <div className="min-h-screen bg-white p-8 flex flex-col">
        {/* Grid container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* -- Green Card (Top Left) -- */}
          <div className="bg-gradient-to-br from-green-400 to-green-500 p-6 rounded-3xl text-white shadow-xl flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-2">
              Your carbon footprint matters.
            </h2>
            <p className="text-xl mb-4">-- lbs Carbon Saved</p>
            <h3 className="text-xl font-semibold mb-2">Daily Tips:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Driving on public transport</li>
              <li>Going meat free</li>
            </ul>
          </div>

          {/* -- Blue Card (Top Right) -- */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-3xl text-white shadow-xl flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">
              Complete your daily evaluation
            </h2>
            <p className="text-xl">Sustainable Facts</p>
          </div>

          {/* -- Green Card (Middle Left) -- */}
          <div className="bg-gradient-to-br from-green-400 to-green-500 p-6 rounded-3xl text-white shadow-xl flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">How do you fly?</h2>
            <p className="text-xl">Flight Tracker Number</p>
          </div>

          {/* -- Blue Card (Middle Right) -- */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-3xl text-white shadow-xl flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Sustainable Sleeping</h2>
          </div>
        </div>

        {/* Footer with ENVORA and about link */}
        <footer className="mt-8 flex justify-between items-center">
          <p className="text-gray-700 text-sm">© ENVORA</p>
          <Link to="/about" className="text-blue-600 hover:underline">
            about
          </Link>
        </footer>
      </div>
    </div>
  );
}

// -- Main Home Component with Fade Animation --
export default function Home() {
  const [showOld, setShowOld] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        setShowOld(false);
      }, 750); // Wait for fade-out animation before switching UI
    }, 1500);
  }, []);

  return (
    <div>
      {/* Old UI container with fade-out effect */}
      {showOld && (
        <div className={`fade ${fadingOut ? "fade-out" : "fade-in"}`}>
          <OldUI />
        </div>
      )}

      {/* New UI container with fade-in effect */}
      {!showOld && (
        <div className="fade fade-in">
          <NewUI />
        </div>
      )}
    </div>
  );
}