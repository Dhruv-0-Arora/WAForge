export const getHotel = async (hotelId) => {
    try {
        const response = await fetch(
            `http://localhost:5000/api/hotel/${hotelId}`,
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching hotel data:", error);
        return null;
    }
};
