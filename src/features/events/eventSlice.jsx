import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserEventsApi, deleteEventApi, createEventApi, updateEventApi } from './eventService';
import { toast } from 'react-hot-toast';

// Fetch user events
export const fetchUserEvents = createAsyncThunk(
  'events/fetchUserEvents',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchUserEventsApi();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create an event
export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const data = await createEventApi(eventData);
      toast.success("Event created successfully!");
      return data;
    } catch (error) {
      toast.error("Failed to create event!");
      return rejectWithValue(error);
    }
  }
);

// Update an event
export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ eventId, eventData }, { rejectWithValue }) => {
    try {
      const data = await updateEventApi(eventId, eventData);
      toast.success("Event updated successfully!");
      return { eventId, updatedData: data };
    } catch (error) {
      toast.error("Failed to update event!");
      return rejectWithValue(error);
    }
  }
);

// Delete an event
export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      await deleteEventApi(eventId);
      toast.success("Event deleted successfully!");
      return eventId;
    } catch (error) {
      toast.error("Failed to delete event!");
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  events: [],
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchUserEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle create event
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })

      // Handle update event
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(event => event._id === action.payload.eventId);
        if (index !== -1) {
          state.events[index] = { ...state.events[index], ...action.payload.updatedData };
        }
      })

      // Handle delete event
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(event => event._id !== action.payload);
      });
  },
});

export default eventSlice.reducer;
