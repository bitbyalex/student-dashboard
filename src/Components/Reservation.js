import React, { useState } from 'react';

const ReservationForm = () => {
  const [userId, setUserId] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, reservation_date: reservationDate, status }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Reservation created successfully!');
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </div>
        <div>
          <label>Reservation Date:</label>
          <input type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} />
        </div>
        <div>
          <label>Status:</label>
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>
        <button type="submit">Create Reservation</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReservationForm;
