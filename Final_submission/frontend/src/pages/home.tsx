import React from "react";
import { useEffect } from "react";

const Home: React.FC = () => {
  useEffect(() => {
    document.title = "Spice Planet | Home";
  }, []);

  return (
    <div>
      <h1>Welcome to Spice Planet</h1>
    </div>
  );
};

export default Home;
