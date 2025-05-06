// Description: Displays the greeting and subtitle, pulling the user's first name from localStorage.

import React, { useState, useEffect } from 'react'; // importing React, useState for username state, useEffect for on-mount side effect

const WelcomeMessage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null); // holds the user's first name, if any

  useEffect(() => {
    const stored = localStorage.getItem('fname'); // on component mount, read 'fname' from localStorage
    if (stored) setUserName(stored);
  }, []);

  return (
    <div className="container mt-4">
      <h2>{userName ? `Hello, ${userName}!` : 'Hello!'}</h2>
      <h4>See your cart here{userName ? `, ${userName}` : ''}</h4>
    </div>
  );
};

export default WelcomeMessage;
