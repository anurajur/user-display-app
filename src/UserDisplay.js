import React, { useState, useEffect } from "react";
import axios from "axios";

function UserDisplay() {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api");
      const { name, email } = response.data.results[0];

      setUserData({
        name: `${name.title} ${name.first} ${name.last}`,
        email,
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          name: `${name.title} ${name.first} ${name.last}`,
          email,
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const localData = localStorage.getItem("userData");
    if (localData) {
      setUserData(JSON.parse(localData));
    } else {
      fetchUserData();
    }
  }, []);

  return (
    <div>
      {userData && (
        <div>
          <p style={{ fontSize: "30px" }}>Name: {userData.name}</p>
          <p style={{ fontSize: "20px" }}>Email: {userData.email}</p>
        </div>
      )}
      <button
        onClick={fetchUserData}
        style={{
          width: "120px",
          height: "40px",
          color: "white",
          fontSize: "18px",
          backgroundColor: "#3399ff",
          border: "1px solid white",
          borderRadius: "20px",
        }}
      >
        Refresh
      </button>
    </div>
  );
}

export default UserDisplay;
