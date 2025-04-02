import axiosInstance from "../../store/axiosConfig";

// Fetch user-specific events
export const fetchUserEventsApi = async () => {
  try {
    const response = await axiosInstance.get('/events/user');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete an event
export const deleteEventApi = async (eventId) => {
  try {
    const response = await axiosInstance.delete(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create a new event
export const createEventApi = async (eventData) => {
  try {
    const response = await axiosInstance.post('/events/create', eventData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update an existing event
export const updateEventApi = async (eventId, eventData) => {
  try {
    const response = await axiosInstance.put(`/events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
