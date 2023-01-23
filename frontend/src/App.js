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
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content-wrapper">
            <Navbar />        
            <Routes>
              <Route element={<PrivateRoutes />}>
                  {/* // METTRE LES ROUTES QUI NECCESSITE UNE CONNEXION ICI */}
                  <Route path="/profil" element={<Profil />} />

              </Route>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
