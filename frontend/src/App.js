import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components

// Pages
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
        <h1 style={{textAlign: 'center', fontSize: 42}}>Express Food</h1>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
