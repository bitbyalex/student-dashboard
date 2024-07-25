import React, { useEffect, useState, useContext } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  TablePagination,
  TextField,
  Box,
  Button,
  styled,
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1rem',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  marginTop: theme.spacing(2),
}));

const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(AuthContext); // Get user from context

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      // Redirect or show unauthorized message
      return; // Prevent fetching if not admin
    }

    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:5001/reservations');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [user]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredReservations = reservations.filter(reservation =>
    reservation.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '16px' }}>
        Admin Dashboard
      </Typography>

      {loading && <CircularProgress />}
      {error && (
        <Snackbar open={true} autoHideDuration={6000}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}

      <SearchContainer>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '16px' }}
        />
        <Button variant="contained" color="primary" onClick={() => setSearchTerm('')}>
          Clear
        </Button>
      </SearchContainer>

      <TableContainer
        component={Paper}
        style={{
          maxHeight: '400px', // Fixed height for the table
          overflowY: 'auto', // Vertical scrolling
          overflowX: 'hidden', // Disable horizontal scrolling
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Reservation Date</StyledTableCell>
              <StyledTableCell>Comments</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReservations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reservation) => (
              <StyledTableRow key={reservation.id}>
                <TableCell>{reservation.first_name}</TableCell>
                <TableCell>{reservation.last_name}</TableCell>
                <TableCell>{reservation.email}</TableCell>
                <TableCell>{new Date(reservation.reservation_date).toLocaleString()}</TableCell>
                <TableCell>{reservation.comments}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredReservations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
};

export default AdminDashboard;
