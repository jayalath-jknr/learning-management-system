import React from 'react';

const Enroll = ({ courseId }) => {
  const handleEnroll = async () => {
    const response = await fetch('http://localhost:8000/enroll/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId }),
    });

    if (response.ok) {
      console.log('Enrollment successful');
    } else {
      console.error('Enrollment failed');
    }
  };

  return <button onClick={handleEnroll}>Enroll</button>;
};

export default Enroll;
