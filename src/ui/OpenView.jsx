import "../styling/home.css";
import imageMask from "../assets/image.jpeg";
import globePlane from "../assets/flight.png";

export default function OpenView() {
    return (
        <div className="fade-in flex justify-center items-center min-h-screen max-h-screen">
            <div className="inline-flex flex-col items-center justify-between w-auto mx-auto">
                {/* Top spacing */}
                <div className="h-[18vh]" />

                {/* "ENVORA" with an image mask */}
                <h1
                    className="flex justify-center items-center text-center text-[64px] font-bold select-none brightness-80 md:text-[96px]"
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
