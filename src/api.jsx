const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

export const fetchTickets = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch tickets');
        return await response.json();
    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw error;
    }
};