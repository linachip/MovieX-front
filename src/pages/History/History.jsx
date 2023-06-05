import React, { useEffect, useState } from "react";
import axios from "axios";

const HistoryComponent = () => {
  const [history, setHistory] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:4040/history?userId=${userId}`)
        .then((response) => {
          const data = response.data;
          if (data.history) {
            setHistory(data.history);
          }
        })
        .catch((error) => {
          console.error("Error retrieving user history:", error);
        });
    }
  }, [userId]);

  return (
    <div>
      <h2> History</h2>
      {history.length > 0 ? (
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No search history found.</p>
      )}
    </div>
  );
};

export default HistoryComponent;
