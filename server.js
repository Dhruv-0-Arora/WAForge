import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Amadeus from "amadeus";

// Load environment variables
dotenv.config();

console.log("Client ID:", process.env.AMADEUS_CLIENT_ID);
console.log("Client Secret:", process.env.AMADEUS_CLIENT_SECRET);

const app = express();
app.use(cors()); // Allow requests from frontend
app.use(express.json());

// Initialize Amadeus API
const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

/**
 * Returns the first hotel near the provided geocode.
 *
 * @param {string|number} lat - The latitude.
 * @param {string|number} lon - The longitude.
 * @returns {Promise<Object>} The first hotel object found near the given location.
 */
async function getNearestHotel(lat, lon) {
    // Fetch hotels near the given geocode
    const response = await amadeus.referenceData.locations.hotels.byGeocode.get(
        {
            latitude: lat,
            longitude: lon,
        },
    );

    const hotels = response.data;
    if (!hotels || hotels.length === 0) {
        throw new Error("No hotels found near that location.");
    }

    // Return the first hotel
    return hotels[0];
}

/**
 * GET /api/hotel/nearest
 * Expects query parameters 'lat' and 'lon'
 * Returns the data for the first hotel that is geographically close to the user.
 */
app.get("/api/hotel/nearest", async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            return res
                .status(400)
                .json({ error: "Latitude and longitude are required." });
        }

        const nearestHotel = await getNearestHotel(lat, lon);
        res.json({ hotel: nearestHotel });
    } catch (error) {
        console.error("Error fetching nearest hotel:", error);
        res.status(500).json({ error: error.message });
    }
});

// /**
//  * GET /api/hotel/sustainability/:hotelId
//  * Uses Amadeus to fetch hotel offers/details and then calculates a dummy sustainability score.
//  */
// app.get("/api/hotel/sustainability/:hotelId", async (req, res) => {
//     try {
//         const { hotelId } = req.params;
//         // Fetch hotel offers/details for the given hotelId
//         const response = await amadeus.shopping.hotelOffers.get({ hotelId });

//         // For example purposes, we use the first offer's "rating" (if available) to calculate a sustainability score.
//         // In a real-world scenario, you might have different data to base this on.
//         const offers = response.data;
//         if (!offers || offers.length === 0) {
//             return res
//                 .status(404)
//                 .json({ error: "Hotel not found or no offers available" });
//         }

//         // Dummy calculation: if a hotel rating exists, multiply it by 10; otherwise, use a default value.
//         const hotelInfo = offers[0];
//         const sustainabilityScore = hotelInfo.rating
//             ? hotelInfo.rating * 10
//             : 50; // default score

//         res.json({
//             hotelId,
//             sustainabilityScore,
//             details: hotelInfo,
//         });
//     } catch (error) {
//         console.error("Error calculating hotel sustainability:", error);
//         res.status(500).json({
//             error: "Failed to calculate hotel sustainability",
//         });
//     }
// });

// /**
//  * GET /api/hotels/most-sustainable
//  * Expects query parameters 'lat' and 'lon'
//  * Finds the nearest hotel (using Amadeus by geocode) and returns the one with the highest sustainability score.
//  */
// app.get("/api/hotels/most-sustainable", async (req, res) => {
//     try {
//         const { lat, lon } = req.query;
//         if (!lat || !lon) {
//             return res
//                 .status(400)
//                 .json({ error: "Latitude and longitude are required." });
//         }

//         // Fetch hotels near the given geocode
//         const response =
//             await amadeus.referenceData.locations.hotels.byGeocode.get({
//                 latitude: lat,
//                 longitude: lon,
//             });

//         const hotels = response.data;
//         if (!hotels || hotels.length === 0) {
//             return res
//                 .status(404)
//                 .json({ error: "No hotels found near that location." });
//         }

//         // For demonstration, assume each hotel object might have a 'rating' property.
//         // We treat that as a proxy for sustainability, and choose the hotel with the highest rating.
//         const mostSustainableHotel = hotels.reduce((prev, current) => {
//             const prevScore = prev.rating || 0;
//             const currentScore = current.rating || 0;
//             return currentScore > prevScore ? current : prev;
//         }, hotels[0]);

//         res.json({ hotel: mostSustainableHotel });
//     } catch (error) {
//         console.error("Error fetching sustainable hotels:", error);
//         res.status(500).json({ error: "Failed to fetch sustainable hotels" });
//     }
// });

// Start Backend Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
