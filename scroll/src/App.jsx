import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Content from './Content';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/content" element={<Content />} />
      </Routes>
    </Router>
  );
}

export default App;
