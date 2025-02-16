import React from "react";

// Define your gradient and corner constants
const GREEN_GRADIENT = "bg-gradient-to-br from-green-400 to-green-600";
const BLUE_GRADIENT = "bg-gradient-to-br from-blue-400 to-blue-600";
// Example corner rounding: left corners for the left column, right corners for the right column
const ROUNDED_LEFT = "rounded-tl-3xl rounded-bl-3xl";
const ROUNDED_RIGHT = "rounded-tr-3xl rounded-br-3xl";

function HomeDesktop() {
    return (
        <div className="h-screen w-full overflow-y-scroll bg-gray-100">
            {/* Container for the main content */}
            <div className="grid grid-cols-2 gap-6 p-8">
                {/* Top-left (Green) Bubble */}
                <div
                    className={`${GREEN_GRADIENT} ${ROUNDED_LEFT} p-8 text-white`}
                >
                    <h1 className="text-2xl font-bold">
                        Your carbon footprint matters.
                    </h1>
                    <p className="mt-2">-- lbs Carbon Saved</p>
                    <div className="mt-4">
                        <p className="font-semibold">Daily Tips:</p>
                        <ul className="list-disc list-inside ml-4">
                            <li>Driving on public transport</li>
                            <li>Going meat free</li>
                        </ul>
                    </div>
                </div>

                {/* Top-right (Blue) Bubble */}
                <div
                    className={`${BLUE_GRADIENT} ${ROUNDED_RIGHT} p-8 text-white`}
                >
                    {/* Link to another page */}
                    <a
                        href="/evaluation"
                        className="text-2xl font-bold underline hover:no-underline"
                    >
                        Complete your daily evaluation
                    </a>
                    <p className="mt-2">Sustainable Facts</p>
                </div>

                {/* Bottom-left (Green) Bubble */}
                <div
                    className={`${GREEN_GRADIENT} ${ROUNDED_LEFT} p-8 text-white`}
                >
                    <h2 className="text-xl font-semibold">How do you fly?</h2>
                    <label className="block mt-4">
                        <span className="block mb-1">
                            Flight Tracker Number
                        </span>
                        <input
                            type="text"
                            placeholder="Enter flight number"
                            className="w-full rounded-md p-2 text-black focus:outline-none"
                        />
                    </label>
                </div>

                {/* Bottom-right (Blue) Bubble */}
                <div
                    className={`${BLUE_GRADIENT} ${ROUNDED_RIGHT} p-8 text-white`}
                >
                    <h2 className="text-xl font-semibold">
                        Sustainable Sleeping
                    </h2>
                </div>
            </div>

            {/* Footer */}
            <footer className="flex justify-between items-center p-8">
                <p>© ENVORA</p>
                {/* Link to another page */}
                <a href="/about" className="underline hover:no-underline">
                    about
                </a>
            </footer>
        </div>
    );
}

export default HomeDesktop;
