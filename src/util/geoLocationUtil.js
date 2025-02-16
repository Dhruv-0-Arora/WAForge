import { addPosition } from "./carbonTrackerUtil";

export const geoLocate = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                addPosition(latitude, longitude);
                updateLiveCarbonSaved();
            },
            (error) => console.error("Geolocation error:", error),
            { enableHighAccuracy: true },
        );
    } else {
        console.error("Geolocation not supported");
    }
};
