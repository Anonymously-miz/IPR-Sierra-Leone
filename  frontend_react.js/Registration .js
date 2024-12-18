import React, { useState } from "react";
import axios from "axios";

const Registration = () => {
  const [ipType, setIpType] = useState("");
  const [document, setDocument] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ipType", ipType);
    formData.append("document", document);

    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/register", formData, {
        headers: { Authorization: token, "Content-Type": "multipart/form-data" },
      });
      alert("Registration submitted!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="IP Type" onChange={(e) => setIpType(e.target.value)} required />
      <input type="file" onChange={(e) => setDocument(e.target.files[0])} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Registration;
