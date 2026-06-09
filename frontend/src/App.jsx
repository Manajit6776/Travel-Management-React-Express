import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllPackages from './pages/AllPackages';
import PackageDetails from './pages/PackageDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Book from './pages/Book';
import MyBookings from './pages/MyBookings';
import Conversation from './pages/Conversation';
import AdminDashboard from './pages/AdminDashboard';
import ManagePackages from './pages/ManagePackages';
import ManageBookings from './pages/ManageBookings';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/packages" element={<AllPackages />} />
              <Route path="/package/:id" element={<PackageDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/book/:id" element={<Book />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/conversation/:bookingId" element={<Conversation />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/packages" element={<ManagePackages />} />
              <Route path="/admin/bookings" element={<ManageBookings />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App
