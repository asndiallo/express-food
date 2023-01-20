import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
        <Router>
            <Navbar />        
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
        <Footer />
    </div>
  );
}

export default App;
