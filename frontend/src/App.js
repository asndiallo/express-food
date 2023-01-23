import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profil from './pages/Profil';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content-wrapper">
            <Navbar />        
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profil" element={<Profil />} />
            </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
