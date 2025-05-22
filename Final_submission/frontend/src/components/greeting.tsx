import React from 'react';
import { useAuth } from '../context/authContext';

const Greeting: React.FC = () => {
  const { customer } = useAuth(); 

  const firstName = customer?.name?.split(' ')[0] ?? '';

  return (
    <div className="container mt-4">
      <h2>{customer ? `Hello, ${firstName}!` : ''}</h2> 
    </div>
  );
};

export default Greeting;