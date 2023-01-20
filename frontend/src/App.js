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
        <div className="content-wrapper">
            <Navbar />        
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
