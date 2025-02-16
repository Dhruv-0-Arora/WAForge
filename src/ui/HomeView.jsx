import React from "react";

// Gradient constants
const GREEN_GRADIENT = "bg-gradient-to-br from-[#41E246] to-[#36B038]";
const BLUE_GRADIENT = "bg-gradient-to-br from-[#4C9FDE] to-[#3372A3]";
const DARK_GREEN_GRADIENT = "bg-gradient-to-br from-[#3ABD3D] to-[#2D7E31]";
const DARK_BLUE_GRADIENT = "bg-gradient-to-br from-[#4771AF] to-[#22416F]";

// Bubble corner styles (switching sides)
const ROUNDED_RIGHT = "rounded-tr-[100px] rounded-br-[100px]";
const ROUNDED_LEFT = "rounded-tl-[100px] rounded-bl-[100px]";

export default function HomeView() {
    return (
        <div className="min-h-screen w-full overflow-y-scroll bg-gray-100 flex flex-col gap-4">
            {/* Top spacing */}
            <div className="h-[5vh]" />

            {/* 1) Top Green Bubble (rounded on right) */}
            <div
                className={`${GREEN_GRADIENT} ${ROUNDED_RIGHT} w-[60%] h-[40vh] flex flex-col items-center justify-center text-white`}
            >
                <h1 className="text-center text-5xl font-bold bg-gradient-to-tr from-[#ABB0AC] to-[#FEFEFE] bg-clip-text text-transparent">
                    Your carbon footprint matters.
                </h1>
                <p className="text-center text-7xl font-bold mt-2">
                    -- lbs Carbon Saved
                </p>
                <div className="mt-4">
                    <p className="font-semibold text-2xl">Daily Tip:</p>
                    <ul className="text-2xl mt-2 space-y-1">
                        <li>Driving on public transport</li>
                        <li>Going meat free</li>
                    </ul>
                </div>
            </div>

            {/* Spacing */}
            <div className="h-[15px]" />

            {/* 2) Second Blue Bubble (rounded on right) */}
            <div
                className={`${BLUE_GRADIENT} ${ROUNDED_LEFT} w-[60%] h-[30vh] flex flex-col items-center justify-center text-center text-white self-end`}
            >
                <a
                    href="/evaluation"
                    className="text-center text-5xl font-bold underline bg-gradient-to-tr from-[#ABB0AC] to-[#FEFEFE] bg-clip-text text-transparent leading-[1.2] pb-1"
                >
                    Complete your daily evaluation
                </a>
                <p className="text-2xl mt-2 text-semibold">Sustainable Facts</p>
            </div>

            {/* Spacing */}
            <div className="h-[15px]" />

            {/* 3) Third Green Bubble (rounded on left) */}
            <div
                className={`${DARK_GREEN_GRADIENT} ${ROUNDED_RIGHT} w-[60%] h-[30vh] flex flex-col items-center justify-center text-center text-white`}
            >
                <h1 className="text-center text-5xl font-bold bg-gradient-to-tr from-[#ABB0AC] to-[#FEFEFE] bg-clip-text text-transparent leading-[1.2] pb-1">
                    How do you fly?
                </h1>
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
                className={`${DARK_BLUE_GRADIENT} ${ROUNDED_LEFT} w-[60%] h-[40vh] flex flex-col items-center justify-center text-center text-white self-end`}
            >
                <h1 className="text-center text-5xl font-bold bg-gradient-to-tr from-[#ABB0AC] to-[#FEFEFE] bg-clip-text text-transparent leading-[1.2] pb-1">
                    Sustainable Sleeping
                </h1>
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
