import { useState } from "react";

import {
    fetchFlightData,
    getAircraft,
    getCategory,
    getCarbon,
} from "../util/planeTrackerUtil.js";

const PlaneTracker = () => {
    const [flightNumber, setFlightNumber] = useState("");
    const [flightData, setFlightData] = useState(null);
    const [Aircraft, setAircraft] = useState(null);
    const [Category, setCategory] = useState(null);
    const [Carbon, setCarbon] = useState("");
    const [showCarbon, setShowCarbon] = useState(false);

    const handleSearch = async () => {
        console.log(flightNumber);

        const model = await fetchFlightData(flightNumber);
        setFlightData(model);
        if (!model) {
            console.error("No aircraft model found.");
            return;
        }

        const aircraft = await getAircraft(model);
        setAircraft(aircraft.result);
        if (!aircraft) {
            console.error("No aircraft found.");
            return;
        }

        const category = await getCategory(aircraft.result);
        setCategory(category.result);
        if (!category) {
            console.error("No category found.");
            return;
        }

        const carbon = await getCarbon(category.result);
        setCarbon(Math.floor(carbon.result));

        setShowCarbon(true);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full bg-transparent">
            {/* Container for input & results */}
            <div className="w-full max-w-lg">
                {/* Bubble-shaped input with white outline & transparent background */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // Prevents full page reload
                        handleSearch(); // Calls the search function
                    }}
                >
                    <div className="relative w-full h-16 rounded-full border-2 border-white flex items-center justify-center px-4">
                        <input
                            type="text"
                            value={flightNumber}
                            onChange={(e) => setFlightNumber(e.target.value)}
                            className="bg-transparent text-center text-black text-xl font-medium placeholder-gray-300 outline-none w-full"
                            placeholder="Enter your flight number (ex. AA123)"
                        />
                    </div>
                </form>

                {/* Show carbon info if available */}
                {showCarbon && (
                    <div>
                        <div className="h-[10px]"></div>
                        <div className="mt-6 p-4 border-2 border-white rounded-md shadow-md">
                            <p>
                                <strong>Plane Model:</strong> {flightData}
                            </p>
                            <p>
                                <strong>Airplane:</strong> {Aircraft}
                            </p>
                            <p>
                                <strong>Category:</strong> {Category}
                            </p>
                            <p>
                                <strong>Carbon Emission:</strong> {Carbon} kg{" "}
                                <strong>Saved</strong> {90 - Carbon / 160} kg{" "}
                                {/* using the average carbon emission per flight to calculate the carbon saved */}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlaneTracker;
