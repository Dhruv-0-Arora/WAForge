import { useState } from "react";

const fetchFlightData = async (flightNumber) => {
    const API_KEY = "71e65438c37e459b973b9669fdedf59c";
    const response = await fetch(
      `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_number=${flightNumber}`
    );
    const data = await response.json();
    console.log('API Response:', data);
    if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
      console.error("Invalid API response or no flight data found.");
      return null;
    }

    const flight = data.data[0]; // First flight match
    return {
        aircraftIATA: flight.aircraft?.iata || "Unknown",
        aircraftModel: flight.aircraft?.icao || "Unknown",
        origin: flight.departure?.airport || "Unknown",
        destination: flight.arrival?.airport || "Unknown",
        estimatedDistance: flight.arrival?.estimated || "Unknown"
    };
  };

  
const PlaneTracker = () => {
    const [flightNumber, setFlightNumber] = useState("");

    const handleSearch = async () => {
        const flightData = await fetchFlightData(flightNumber);
        console.log(flightData);
    };

    return (
        <div>
            <input
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );

  
};

export default PlaneTracker;
