import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Content from './Content';
import Test from './Test';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/content" element={<Content />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
