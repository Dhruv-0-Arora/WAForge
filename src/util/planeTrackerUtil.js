export const fetchFlightData = async (flightNumber) => {
    console.log(flightNumber);
    const API_KEY = "71e65438c37e459b973b9669fdedf59c";
    const response = await fetch(
        `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`,
    );
    const data = await response.json();
    console.log("API Response:", data);
    var flight = data.data[0];
    if (
        !data ||
        !data.data ||
        !Array.isArray(data.data) ||
        data.data.length === 0
    ) {
        console.error("Invalid API response or no flight data found.");
        return null;
    }
    if (!flight.aircraft || !flight.aircraft.iata) {
        console.error("No aircraft IATA code found in API response.");
        flight = data.data[1];
        if (
            !data ||
            !data.data ||
            !Array.isArray(data.data) ||
            data.data.length === 0
        ) {
            console.error("Invalid API response or no flight data found.");
            return null;
        }
    }
    return flight.aircraft.iata;
};

export const getAircraft = async (model) => {
    const params = {
        action: "getAircraft",
        value: model,
    };
    const searchParams = new URLSearchParams(params);
    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzCgySJ2sq-oU-owSG_8WZERLZhGW1MhVdzNjFXMWOgcv-jbxx3_tauGfaEGJEfHmDhww/exec?" +
            searchParams.toString(),
    );
    const aircraft = await response.json();
    console.log("Aircraft:", aircraft);
    return aircraft;
};

export const getCategory = async (aircraft) => {
    const params = {
        action: "getCategory",
        value: aircraft,
    };
    const searchParams = new URLSearchParams(params);
    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzCgySJ2sq-oU-owSG_8WZERLZhGW1MhVdzNjFXMWOgcv-jbxx3_tauGfaEGJEfHmDhww/exec?" +
            searchParams.toString(),
    );
    const category = await response.json();
    console.log("Category:", category);
    return category;
};

export const getCarbon = async (category) => {
    const params = {
        action: "getCarbon",
        value: category,
    };
    const searchParams = new URLSearchParams(params);
    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzCgySJ2sq-oU-owSG_8WZERLZhGW1MhVdzNjFXMWOgcv-jbxx3_tauGfaEGJEfHmDhww/exec?" +
            searchParams.toString(),
    );
    const carbon = await response.json();
    console.log("Carbon:", carbon);
    return carbon;
};
