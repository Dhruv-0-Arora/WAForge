import React from "react";

// Gradient constants
const GREEN_GRADIENT = "bg-gradient-to-br from-green-400 to-green-600";
const BLUE_GRADIENT = "bg-gradient-to-br from-blue-400 to-blue-600";

// Bubble corner styles (switching sides)
const ROUNDED_RIGHT = "rounded-tr-[100px] rounded-br-[100px]";
const ROUNDED_LEFT = "rounded-tl-[100px] rounded-bl-[100px]";

function HomeDesktop() {
    return (
        <div className="min-h-screen w-full overflow-y-scroll bg-gray-100 flex flex-col gap-4">
            {/* Top spacing */}
            <div className="h-[5vh]" />

            {/* "ENVORA" with an image mask */}

            {/* 1) Top Green Bubble (rounded on right) */}
            <div
                className={`${GREEN_GRADIENT} ${ROUNDED_RIGHT} w-[60%] h-[40vh] flex flex-col items-center justify-center text-center text-white`}
            >
                <h1 className="text-3xl font-bold">
                    Your carbon footprint matters.
                </h1>
                <p className="text-xl mt-2">-- lbs Carbon Saved</p>
                <div className="mt-4">
                    <p className="font-semibold">Daily Tip:</p>
                    <ul className="mt-2 space-y-1">
                        <li>Driving on public transport</li>
                        <li>Going meat free</li>
                    </ul>
                </div>
            </div>

            {/* Spacing */}
            <div className="h-[15px]" />

            {/* 2) Second Blue Bubble (rounded on right) */}
            <div
                className={`${BLUE_GRADIENT} ${ROUNDED_LEFT} w-[60%] h-[40vh] flex flex-col items-center justify-center text-center text-white self-end`}
            >
                <a href="/evaluation" className="text-3xl font-bold underline">
                    Complete your daily evaluation
                </a>
                <p className="text-xl mt-2">Sustainable Facts</p>
            </div>

            {/* Spacing */}
            <div className="h-[15px]" />

            {/* 3) Third Green Bubble (rounded on left) */}
            <div
                className={`${GREEN_GRADIENT} ${ROUNDED_RIGHT} w-[60%] h-[40vh] flex flex-col items-center justify-center text-center text-white`}
            >
                <h2 className="text-3xl font-bold">How do you fly?</h2>
                <p className="text-xl mt-2">Flight Tracker Number</p>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Enter flight number"
                        className="px-4 py-2 rounded focus:outline-none text-black"
                    />
                </div>
            </div>

            {/* Spacing */}
            <div className="h-[15px]" />

            {/* 4) Fourth Blue Bubble (rounded on left) */}
            <div
                className={`${BLUE_GRADIENT} ${ROUNDED_LEFT} w-[60%] h-[40vh] flex flex-col items-center justify-center text-center text-white self-end`}
            >
                <h2 className="text-3xl font-bold">Sustainable Sleeping</h2>
            </div>

            {/* Footer */}
            <footer className="flex justify-between items-center p-4">
                <p>© ENVORA</p>
                <a href="/about" className="underline">
                    about
                </a>
            </footer>
        </div>
    );
}

export default HomeDesktop;
