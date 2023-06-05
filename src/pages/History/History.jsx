import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        handleHistory();
      }, []);

    const handleHistory = async () => {
        try {
            const response = await axios.get("http://localhost:4040/history");
            const userId = response.data;
            setHistory(userId);
        } catch(error) {
            console.error(error);
        }
      };

  return (
    <div>
    <h1>History</h1>
    <ul>
      {history.map((entry) => (
        <li key={entry.id}>{entry.title}</li>
      ))}
    </ul>
  </div>
  )
}

export default History