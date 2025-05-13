// Description: Displays the greeting and subtitle, pulling the user's first name from localStorage.

import React from 'react'; // importing React, useState for username state, useEffect for on-mount side effect
import { useAuth } from '../context/authContext'; //import for context

const Greeting: React.FC = () => {
  const { user } = useAuth(); //get user from context

  return (
    <div className="container mt-4">
      <h2>{user ? `Hello, ${user.fname}!` : ''}</h2>
    </div>
  );
};

export default Greeting;
