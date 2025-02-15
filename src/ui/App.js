import "../util/App.css";
import FlightTakeoff from "../assets/Flight.png";

function App() {
    return (
        <div>
            <div className="header">
                <h1>Your Guide to Sustainable Living</h1>
                <img
                    src={FlightTakeoff}
                    alt=""
                    className="center"
                    height={300}
                    width={300}
                />
            </div>
            <div className="App">
                <p>This is a sample app for the WAForge Hackathon</p>
                <a href="/about">About</a>
            </div>
        </div>
    );
}

export default App;
