import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get("/api/register", {
          headers: { Authorization: token },
        });
        setRegistrations(data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      }
    };
    fetchRegistrations();
  }, []);

  return (
    <div>
      <h2>Your Registrations</h2>
      <table>
        <thead>
          <tr>
            <th>IP Type</th>
            <th>Document</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg) => (
            <tr key={reg._id}>
              <td>{reg.ipType}</td>
              <td>
                <a href={`/${reg.document}`} target="_blank" rel="noreferrer">
                  View Document
                </a>
              </td>
              <td>{reg.status}</td>
              <td>{new Date(reg.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
