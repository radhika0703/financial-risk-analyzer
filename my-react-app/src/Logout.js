import React from "react";

function Logout({ setUser }) {

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;