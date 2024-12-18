import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState("");

  useEffect(() => {
    const fetchAllRegistrations = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get("/api/admin/registrations", {
          headers: { Authorization: token },
        });
        setRegistrations(data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      }
    };
    fetchAllRegistrations();
  }, []);

  const handleStatusUpdate = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `/api/admin/registrations/${id}`,
        { status: updatedStatus },
        { headers: { Authorization: token } }
      );
      alert("Status updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>IP Type</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg) => (
            <tr key={reg._id}>
              <td>{reg.user.username}</td>
              <td>{reg.ipType}</td>
              <td>{reg.status}</td>
              <td>
                <select onChange={(e) => setUpdatedStatus(e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button onClick={() => handleStatusUpdate(reg._id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
