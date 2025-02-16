import React, { useState, useEffect } from "react";
import {
    addPosition,
    getTravelHistory,
    resetTravelHistory,
    calculateTotalDistance,
    addCarbonSaved,
    getCarbonSaved,
} from "../util/carbonTrackerUtil";

export default function TravelView() {
    const [isRecording, setIsRecording] = useState(false);
    const [carbonSaved, setCarbonSaved] = useState(0);
    const [distanceTraveled, setDistanceTraveled] = useState(0);
    let trackingInterval = null;

    // Constants for CO2 emissions (kg CO2 per mile)
    const CAR_EMISSIONS = 0.411; // Average car emissions per mile
    const PUBLIC_TRANSPORT_EMISSIONS = 0.089; // Average bus emissions per mile

    // Function to start tracking location every minute
    const startRecording = () => {
        setIsRecording(true);
        resetTravelHistory(); // Clear previous travel history
        setCarbonSaved(0);
        setDistanceTraveled(0);

        trackingInterval = setInterval(async () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        addPosition(latitude, longitude);
                        updateLiveCarbonSaved();
                    },
                    (error) => console.error("Geolocation error:", error),
                    { enableHighAccuracy: true },
                );
            } else {
                console.error("Geolocation not supported");
            }
        }, 60000); // Every 1 minute
    };

    // Function to stop tracking
    const stopRecording = () => {
        setIsRecording(false);
        clearInterval(trackingInterval);

        const milesTraveled = calculateTotalDistance();
        setDistanceTraveled(milesTraveled);

        const carbonCar = milesTraveled * CAR_EMISSIONS;
        const carbonBus = milesTraveled * PUBLIC_TRANSPORT_EMISSIONS;
        const carbonSavedValue = carbonCar - carbonBus;

        setCarbonSaved(carbonSavedValue);
        addCarbonSaved(carbonSavedValue);
    };

    // Function to update live carbon savings
    const updateLiveCarbonSaved = () => {
        const milesTraveled = calculateTotalDistance();
        setDistanceTraveled(milesTraveled);

        const carbonCar = milesTraveled * CAR_EMISSIONS;
        const carbonBus = milesTraveled * PUBLIC_TRANSPORT_EMISSIONS;
        setCarbonSaved(carbonCar - carbonBus);
    };

    // Live update of carbon saved while recording
    useEffect(() => {
        if (isRecording) {
            const liveUpdate = setInterval(updateLiveCarbonSaved, 60000); // Every 1 min
            return () => clearInterval(liveUpdate);
        }
    }, [isRecording]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white p-6">
            <div className="bg-gray-100 m-4 p-6 rounded-md border-2 border-gray-500 flex flex-col gap-4">
                <h1 className="text-3xl text-black font-bold mb-6">
                    Travel Carbon Tracker
                </h1>

                {/* Show Start Button when NOT recording */}
                {!isRecording && (
                    <button
                        onClick={startRecording}
                        className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-all"
                    >
                        Start Recording
                    </button>
                )}

                {/* Show Stop Button when recording */}
                {isRecording && (
                    <button
                        onClick={stopRecording}
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-all"
                    >
                        Stop Recording
                    </button>
                )}

                {/* Display Live Carbon Saved While Recording */}
                {isRecording && (
                    <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-md text-center">
                        <h2 className="text-xl font-semibold">Live Tracking</h2>
                        <p className="text-lg mt-2">
                            Distance Traveled: {distanceTraveled.toFixed(2)}{" "}
                            miles
                        </p>
                        <p className="text-lg mt-2 text-green-400">
                            Carbon Saved: {carbonSaved.toFixed(2)} kg CO₂
                        </p>
                    </div>
                )}

                {/* Display Final Carbon Saved After Stopping */}
                {!isRecording && carbonSaved > 0 && (
                    <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-md text-center">
                        <h2 className="text-xl font-semibold">
                            Travel Summary
                        </h2>
                        <p className="text-lg mt-2">
                            Distance Traveled: {distanceTraveled.toFixed(2)}{" "}
                            miles
                        </p>
                        <p className="text-lg mt-2 text-green-400">
                            Carbon Saved: {carbonSaved.toFixed(2)} kg CO₂
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            (Compared to driving the same distance by car)
                        </p>
                    </div>
                )}

                {/* Total Carbon Saved in Local Storage */}
                <div className="mt-4 text-gray-400">
                    <p>
                        Total Carbon Saved Overall:{" "}
                        {getCarbonSaved().toFixed(2)} kg CO₂
                    </p>
                </div>
            </div>
        </div>
    );
}
