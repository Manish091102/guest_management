import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaEnvelope } from "react-icons/fa";
import "./MyEvent.css";
import axiosInstance from "../../store/axiosConfig";

const MyEventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showInvitationListModal, setShowInvitationListModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [inviteEmails, setInviteEmails] = useState("");
  const [invitations, setInvitations] = useState([]);
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
  });

  const fetchEvents = async () => {
    try {
      const response = await axiosInstance.get("/events/user");

      setEvents(response.data);
    } catch (err) {
      // setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/events/${id}`);

      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  const handleUpdate = (event) => {
    setEditingEventId(event._id); // Set editing event ID
    setEventData({
      name: event.name,
      date: event.date.split("T")[0], // Extract only YYYY-MM-DD from timestamp
      time: event.time,
      location: event.location,
    });
    setShowModal(true);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      if (editingEventId) {
        // UPDATE EXISTING EVENT
        await axiosInstance.put(`/events/${editingEventId}`, eventData);
  
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === editingEventId ? { ...event, ...eventData } : event
          )
        );
      } else {
        // CREATE NEW EVENT
        const response = await axiosInstance.post("/events/create", eventData);
        setEvents((prevEvents) => [...prevEvents, response.data]);
      }
  
      setShowModal(false);
      setEditingEventId(null);
      setEventData({ name: "", date: "", time: "", location: "" });
      fetchEvents();
    } catch (error) {
      console.error("Error saving event", error);
    }
  };
  

  const handleInvite = async () => {
    if (!inviteEmails.trim()) {
      alert("Please enter at least one email address.");
      return;
    }
  
    // Convert comma-separated string into an array
    const emailList = inviteEmails.split(",").map((email) => email.trim());
  
    try {
      await axiosInstance.post("/invitation/send", {
        eventId: selectedEventId,
        emails: emailList,
      });
  
      alert("Invitations sent successfully!");
      setShowInviteModal(false);
      setInviteEmails("");
    } catch (error) {
      console.error("Error sending invitations", error);
      alert("Failed to send invitations.");
    }
  };

  const handleEventClick = async (eventId) => {
    setSelectedEventId(eventId);
    setShowInvitationListModal(true);
  
    try {
      const response = await axiosInstance.get(`/invitation/list/${eventId}`);
      console.log("response", response.data);
  
      // Merge all invitation statuses into one array
      const allInvitations = [
        ...response.data.invitations.pending, 
        ...response.data.invitations.accepted, 
        ...response.data.invitations.rejected
      ];
  
      setInvitations(allInvitations);
    } catch (error) {
      console.error("Error fetching invitations", error);
      setInvitations([]);
    }
  };
  
  

  return (
    <>
    <div className="event-table-container">
      <div className="header">
        <h2>My Events</h2>
        <div
          className="create-event-btn"
          onClick={() => {
            setShowModal(true);
            setEditingEventId(null);
          }}
        >
          <FaPlus className="icon" /> Create Event
        </div>
      </div>

      {loading ? (
        <p className="loading-text">Loading events...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : events.length === 0 ? (
        <p className="no-events">No events available.</p>
      ) : (
        <table className="event-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Event Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event._id} onClick={() => handleEventClick(event._id)}>
                <td>{index + 1}</td>
                <td>{event.name}</td>
                <td>
                  {event.date ? new Date(event.date).toDateString() : "N/A"}
                </td>

                <td>{event.time}</td>
                <td>{event.location}</td>
                <td className="action-buttons">
                  <button
                    className="update-btn"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleUpdate(event);
                    }}
                  >
                    <FaEdit className="icon" /> Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ Stop row click
                      handleDelete(event._id);
                    }}
                  >
                    <FaTrash className="icon" /> Delete
                  </button>
                   <button
                      className="invite-btn"
                      onClick={(e) => {
                        e.stopPropagation(); // ✅ Prevent row click from triggering
                        setSelectedEventId(event._id);
                        setShowInviteModal(true);
                      }}
                    >
                    <FaEnvelope className="icon" /> Invite
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

{showInvitationListModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <h3>Event Invitations</h3>
        <FaTimes className="close-icon" onClick={() => setShowInvitationListModal(false)} />
      </div>
      {invitations.length === 0 ? (
        <p>No invitations found.</p>
      ) : (
        <table className="invitation-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invitations.map((inv, index) => (
              <tr key={inv._id || index}>
                <td>{index + 1}</td>
                <td>{inv.email}</td>
                <td>
                  <span className={`status ${inv.status.toLowerCase()}`}>
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
)}

    

      {showInviteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Invite Users</h3>
              <FaTimes
                className="close-icon"
                onClick={() => setShowInviteModal(false)}
              />
            </div>
            <div className="invite-form">
              <label>Enter Email Addresses (comma-separated):</label>
              <textarea
                value={inviteEmails}
                onChange={(e) => setInviteEmails(e.target.value)}
                placeholder="example1@gmail.com, example2@gmail.com"
                required
              />
              <button className="submit-btn" onClick={handleInvite}>
                Send Invites
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FOR CREATING/UPDATING EVENT */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingEventId ? "Update Event" : "Create New Event"}</h3>
              <FaTimes
                className="close-icon"
                onClick={() => {
                  setShowModal(false);
                  setEditingEventId(null);
                }}
              />
            </div>
            <form onSubmit={handleCreateEvent} className="event-form">
              <div className="form-group">
                <label>Event Name:</label>
                <input
                  type="text"
                  value={eventData.name}
                  onChange={(e) =>
                    setEventData({ ...eventData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Date:</label>
                <input
                  type="date"
                  value={eventData.date}
                  onChange={(e) =>
                    setEventData({ ...eventData, date: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Time:</label>
                <input
                  type="time"
                  value={eventData.time}
                  onChange={(e) =>
                    setEventData({ ...eventData, time: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Location:</label>
                <input
                  type="text"
                  value={eventData.location}
                  onChange={(e) =>
                    setEventData({ ...eventData, location: e.target.value })
                  }
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                {editingEventId ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default MyEventList;
