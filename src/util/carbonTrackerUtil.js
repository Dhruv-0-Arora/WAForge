const CARBON_STORAGE_KEY = "carbonSaved";
const TRAVEL_HISTORY_KEY = "travelHistory";

/**
 * Retrieves the total carbon saved from local storage.
 * @returns {number} The stored carbon saved value.
 */
export function getCarbonSaved() {
    const savedValue = localStorage.getItem(CARBON_STORAGE_KEY);
    return savedValue ? parseInt(savedValue, 10) : 0;
}

/**
 * Adds an amount of carbon saved and updates local storage.
 * @param {number} amount - The amount of carbon saved to add.
 */
export function addCarbonSaved(amount) {
    if (typeof amount !== "number" || isNaN(amount)) {
        console.error("Invalid carbon amount provided.");
        return;
    }

    const currentCarbon = getCarbonSaved();
    const newCarbon = currentCarbon + Math.floor(amount);
    localStorage.setItem(CARBON_STORAGE_KEY, newCarbon.toString());
}

/**
 * Resets the carbon saved value in local storage to 0.
 */
export function resetCarbonSaved() {
    localStorage.setItem(CARBON_STORAGE_KEY, "0");
}

/**
 * Retrieves the travel history (array of [lat, lon] pairs) from local storage.
 * @returns {Array<Array<number>>} Array of latitude-longitude pairs.
 */
export function getTravelHistory() {
    const history = localStorage.getItem(TRAVEL_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
}

/**
 * Adds a new position ([latitude, longitude]) to travel history in local storage.
 * @param {number} lat - Latitude value.
 * @param {number} lon - Longitude value.
 */
export function addPosition(lat, lon) {
    if (typeof lat !== "number" || typeof lon !== "number") {
        console.error("Invalid latitude or longitude provided.");
        return;
    }

    const history = getTravelHistory();
    history.push([lat, lon]); // Add new position
    localStorage.setItem(TRAVEL_HISTORY_KEY, JSON.stringify(history));
}

/**
 * Resets the travel history in local storage.
 */
export function resetTravelHistory() {
    localStorage.setItem(TRAVEL_HISTORY_KEY, JSON.stringify([]));
}

/**
 * Calculates the total distance traveled in miles using the Haversine formula.
 * @returns {number} Total distance traveled in miles.
 */
export function calculateTotalDistance() {
    const history = getTravelHistory();
    if (history.length < 2) return 0; // Not enough points to calculate distance

    const R = 3958.8; // Earth's radius in miles
    let totalDistance = 0;

    for (let i = 1; i < history.length; i++) {
        const [lat1, lon1] = history[i - 1];
        const [lat2, lon2] = history[i];

        // Convert degrees to radians
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * (Math.PI / 180)) *
                Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        totalDistance += R * c; // Distance in miles
    }

    return totalDistance;
}
