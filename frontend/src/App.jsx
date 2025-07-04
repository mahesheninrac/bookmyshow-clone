// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx'; // You can create this page next
import MovieDetails from './pages/MovieDetails.jsx';
import BookingPage from './pages/BookingPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/book/:showId" element={<BookingPage />} />
    </Routes>
  );
}

export default App;
