// Description: Displays the greeting and subtitle, pulling the customer's first name from context.

import React from 'react';
import { useAuth } from '../context/authContext';

const Greeting: React.FC = () => {
  const { customer } = useAuth(); 

  return (
    <div className="container mt-4">
      <h2>{customer ? `Hello, ${customer.fname}!` : ''}</h2> 
    </div>
  );
};

export default Greeting;
