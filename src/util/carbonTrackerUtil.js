const CARBON_STORAGE_KEY = "carbonSaved";

/**
 * Retrieves the total carbon saved from local storage.
 * @returns {number} The stored carbon saved value.
 */
export function getCarbonSaved() {
    const savedValue = localStorage.getItem(CARBON_STORAGE_KEY);
    return savedValue ? parseInt(savedValue, 10) : 0; // Default to 0 if null
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
    const newCarbon = currentCarbon + Math.floor(amount); // Ensure whole numbers
    localStorage.setItem(CARBON_STORAGE_KEY, newCarbon.toString());
}

/**
 * Resets the carbon saved value in local storage to 0.
 */
export function resetCarbonSaved() {
    localStorage.setItem(CARBON_STORAGE_KEY, "0");
}
