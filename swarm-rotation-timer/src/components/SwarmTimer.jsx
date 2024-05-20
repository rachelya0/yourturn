import React, { useState, useEffect } from 'react';

const SwarmTimer = () => {
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [users, setUsers] = useState(['Alice', 'Bob', 'Charlie', 'Diana']);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) {
      rotateUsers();
      setTimeLeft(10 * 60);
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const rotateUsers = () => {
    setCurrentUserIndex(prevIndex => (prevIndex + 1) % users.length);
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div>
      <h1>Swarm Rotation Timer</h1>
      <h2>Current User: {users[currentUserIndex]}</h2>
      <h3>Time Left: {formatTime(timeLeft)}</h3>
      {timeLeft <= 2 * 60 && timeLeft > 0 && (
        <h3 style={{ color: 'red' }}>Two-minute warning!</h3>
      )}
      <button onClick={rotateUsers}>Rotate Now</button>
      <ul>
        {users.map((user, index) => (
          <li
            key={index}
            style={{
              fontWeight: index === currentUserIndex ? 'bold' : 'normal',
              color: index === currentUserIndex ? 'blue' : 'black'
            }}
          >
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SwarmTimer;
