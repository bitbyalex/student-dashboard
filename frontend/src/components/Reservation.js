import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

// Utility function to get 30-minute interval options in AM/PM format
const getTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12; // Convert 24-hour format to 12-hour format
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${displayHour}:${minute === 0 ? '00' : minute} ${ampm}`;
      slots.push(time);
    }
  }
  return slots;
};

const ReservationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [comments, setComments] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert selected time from AM/PM to 24-hour format
    const [time, ampm] = selectedTime.split(' ');
    const [hours, minutes] = time.split(':');
    let hour24 = parseInt(hours, 10);
    if (ampm === 'PM' && hour24 < 12) hour24 += 12;
    if (ampm === 'AM' && hour24 === 12) hour24 = 0;

    // Combine date with selected time
    const dateTime = new Date(reservationDate);
    dateTime.setHours(hour24, parseInt(minutes, 10), 0, 0);
    const reservationDateTime = dateTime.toISOString();

    try {
      const response = await fetch('http://localhost:5001/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          reservation_date: reservationDateTime,
          comments,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Reservation created successfully!');
        setFirstName('');
        setLastName('');
        setEmail('');
        setReservationDate('');
        setSelectedTime('');
        setComments('');
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Create Reservation
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Reservation Date"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={reservationDate}
                onChange={(e) => setReservationDate(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Select Time</InputLabel>
                <Select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  label="Select Time"
                  required
                >
                  {getTimeSlots().map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Comments"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Reservation
              </Button>
            </Grid>
          </Grid>
        </form>
        {message && <Typography variant="body2" color="error" align="center" style={{ marginTop: '16px' }}>{message}</Typography>}
      </Paper>
    </Container>
  );
};

export default ReservationForm;
