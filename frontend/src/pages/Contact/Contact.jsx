import React, { useEffect, useState } from 'react';

const Contact = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/test')
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => {
        console.error('Error fetching from backend:', err);
        setMessage('Failed to connect to backend.');
      });
  }, []);

  return (
    <div className="p-4 border-2 border-yellow-400 rounded-xl bg-[#FDF6E3] text-gray-800 max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-2">Backend Response:</h2>
      <p>{message}</p>
    </div>
  );
};

export default Contact;
