import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast
import "./Invitation.css"; // Import custom styles
import axiosInstance from "../store/axiosConfig";

export default function InvitationResponse() {
  const { invitationId } = useParams();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const handleResponse = async (response) => {
    try {
      const res = await axiosInstance.patch(`/invitation/invitation/${invitationId}`, {
          status: response,
        });
      setStatus(response);
      setMessage(res.data.message);

      toast.success(res.data.message);
    } catch (error) {
      console.error(error.response?.data?.error || "Unknown error");

      // Error toast
      toast.error(error.response?.data?.error || "Failed to update invitation status.");
    }
  };

  return (
    <div className="invitation-container">
      <Toaster position="top-center" reverseOrder={false} /> {/* Add toaster here */}
      <div className="invitation-card">
        <h2 className="invitation-title">Event Invitation</h2>
        {status ? (
          <p className="invitation-message">{message}</p>
        ) : (
          <>
            <p className="invitation-text">Would you like to accept or reject this invitation?</p>
            <div className="invitation-button-container">
              <button onClick={() => handleResponse("accepted")} className="accept-button">Accept</button>
              <button onClick={() => handleResponse("rejected")} className="reject-button">Reject</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
