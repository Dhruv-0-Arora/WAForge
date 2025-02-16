import { useState } from "react";

const fetchFlightData = async (flightNumber) => {
    console.log(flightNumber);
    const API_KEY = "71e65438c37e459b973b9669fdedf59c";
    const response = await fetch(
      `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`
    );
    const data = await response.json();
    console.log('API Response:', data);
    var flight = data.data[0]; 
    if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
        console.error("Invalid API response or no flight data found.");
        return null;
    }
    if (!flight.aircraft || !flight.aircraft.iata) {
        console.error("No aircraft IATA code found in API response.");
        flight = data.data[1]; 
        if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
            console.error("Invalid API response or no flight data found.");
            return null;
        }
    }
    return flight.aircraft.iata;
  };


const getAircraft = async(model) => {
    const params = {
        action: 'getAircraft',
        value: model,
      };
    const searchParams = new URLSearchParams(params);      
    const response = await fetch(
        'https://script.google.com/macros/s/AKfycbzCgySJ2sq-oU-owSG_8WZERLZhGW1MhVdzNjFXMWOgcv-jbxx3_tauGfaEGJEfHmDhww/exec?' + searchParams.toString(),
    );
    const aircraft = await response.json();
    console.log('Aircraft:', aircraft);
    return aircraft;
}
const getCategory = async(aircraft) => {
    const params = {
        action: 'getCategory',
        value: aircraft,
      };
    const searchParams = new URLSearchParams(params);      
    const response = await fetch(
        'https://script.google.com/macros/s/AKfycbzCgySJ2sq-oU-owSG_8WZERLZhGW1MhVdzNjFXMWOgcv-jbxx3_tauGfaEGJEfHmDhww/exec?' + searchParams.toString(),
    );
    const category = await response.json();
    console.log('Category:', category);
    return category;
}
const getCarbon = async(category) => {
    const params = {
        action: 'getCarbon',
        value: category,
      };
    const searchParams = new URLSearchParams(params);      
    const response = await fetch(
        'https://script.google.com/macros/s/AKfycbzCgySJ2sq-oU-owSG_8WZERLZhGW1MhVdzNjFXMWOgcv-jbxx3_tauGfaEGJEfHmDhww/exec?' + searchParams.toString(),
    );
    const carbon = await response.json();
    console.log('Carbon:', carbon);
    return carbon;
}

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
        setCarbon(Math.floor(carbon.results));
    
        setShowCarbon(true);
    };
    
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold text-center">Flight Carbon Tracker</h1>
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Flight Number"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Search
                </button>
            </div>
            {showCarbon && (
                <div className="bg-gray-100 p-4 rounded-md">
                    <p><strong>Plane Model:</strong> {flightData}</p>
                    <p><strong>Airplane:</strong> {Aircraft}</p>
                    <p><strong>Category:</strong> {Category}</p>
                    <p><strong>Carbon Emission:</strong> {Carbon}</p>
                </div>
            )}
        </div>
    );
};

export default PlaneTracker;
