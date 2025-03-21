import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Content from './pages/Content';
import Test from './pages/Test';
import FaceStatus from './pages/FaceStatus';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/content/:topic" element={<Content />} />
        <Route path="/test" element={<Test />} />
        <Route path="/facetrackTest" element={<FaceStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
