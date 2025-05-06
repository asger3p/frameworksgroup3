// Description: Displays the greeting and subtitle, pulling the user's first name from localStorage.

import React, { useState, useEffect } from 'react'; // importing React, useState for username state, useEffect for on-mount side effect

const TitleCart: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null); // holds the user's first name, if any

  useEffect(() => { // on mount (i.e. when the component first renders and is inserted into the DOM), read 'fname' from localStorage. Only need to load localStorage once—there’s no need to re-run this every time the component updates.
    const stored = localStorage.getItem('fname');
    if (stored) setUserName(stored);
  }, []);

  return (
    <div className="container mt-4">
      <h2>{userName ? `Hello, ${userName}!` : 'Hello!'}</h2>
      <h4>See your cart here{userName ? `, ${userName}` : ''}</h4>
    </div>
  );
};

export default TitleCart;
