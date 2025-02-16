import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import "../styling/home.css";
import imageMask from "../assets/image.jpeg"; 
import globePlane from "../assets/flight.png"; 

// -- The OLD UI (ENVORA with plane) --
function OldUI() {
  return (
    <div className="fade-in">
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
      <div className="globalPlane h-auto">
        <img
          src={globePlane}
          alt="Earth with airplane"
          className="max-w-[75vw] h-auto"
        />
      </div>
      <p className="tagline text-3xl font-bold text-gray-700 font-bold">
        Your Guide to Sustainable Living
      </p>
    </div>
  );
}

// -- The NEW UI (Staggered Boxes with Proper Padding) --
function NewUI() {
  return (
    <div className="fade-in">
      <div className="min-h-screen bg-white p-10 flex flex-col space-y-12">
        
        {/* -- Green Box (Staggered Left) -- */}
        <div 
          className="bg-gradient-to-br from-green-400 to-green-500 p-16 rounded-3xl text-white shadow-xl transform translate-x-[-10%] border border-white"
          style={{ padding: "4rem", backgroundColor: "rgba(0,255,0,0.2)" }} // Debugging background
        >
          <h2 className="text-2xl font-bold mb-4">Your Carbon Footprint</h2>
          <p className="text-xl mb-4">-- lbs Carbon Saved</p>
          <h3 className="text-xl font-semibold mb-4">Daily Tips:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Driving on public transport</li>
            <li>Going meat free</li>
          </ul>
        </div>

        {/* -- Blue Box (Staggered Right) -- */}
        <div 
          className="bg-gradient-to-br from-blue-400 to-blue-600 p-16 rounded-3xl text-white shadow-xl self-end transform translate-x-[10%] border border-white"
          style={{ padding: "4rem", backgroundColor: "rgba(0,0,255,0.2)" }} // Debugging background
        >
          <h2 className="text-2xl font-bold mb-4">Complete Your Daily Evaluation</h2>
          <p className="text-xl">Sustainable Facts</p>
        </div>

        {/* -- Green Box (Staggered Left) -- */}
        <div 
          className="bg-gradient-to-br from-green-400 to-green-500 p-16 rounded-3xl text-white shadow-xl transform translate-x-[-10%] border border-white"
          style={{ padding: "4rem", backgroundColor: "rgba(0,255,0,0.2)" }} // Debugging background
        >
          <h2 className="text-2xl font-bold mb-4">How Do You Fly?</h2>
          <p className="text-xl">Flight Tracker Number</p>
        </div>

        {/* -- Blue Box (Staggered Right) -- */}
        <div 
          className="bg-gradient-to-br from-blue-400 to-blue-600 p-16 rounded-3xl text-white shadow-xl self-end transform translate-x-[10%] border border-white"
          style={{ padding: "4rem", backgroundColor: "rgba(0,0,255,0.2)" }} // Debugging background
        >
          <h2 className="text-2xl font-bold mb-4">Sustainable Sleeping</h2>
        </div>

        {/* Footer */}
        <footer className="mt-12 flex justify-between items-center">
          <p className="text-gray-700 text-sm">© ENVORA</p>
          <Link to="/about" className="text-blue-600 hover:underline">about</Link>
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
      }, 750); 
    }, 1500);
  }, []);

  return (
    <div>
      {showOld && (
        <div className={`fade ${fadingOut ? "fade-out" : "fade-in"}`}>
          <OldUI />
        </div>
      )}
      {!showOld && (
        <div className="fade fade-in">
          <NewUI />
        </div>
      )}
    </div>
  );
}