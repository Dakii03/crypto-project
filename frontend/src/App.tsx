import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import reactLogo from './assets/react.svg';
// import viteLogo from './vite.svg';
import './App.css';

import Blocks from './Blocks';
import Balance from './Balance';
import Send from './Send';

function App() {
  return (
    <div className="wrapper">
      <Router>
        {/* <div>
          <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div> */}
        <h1>Vite + React</h1>
        <div className="card">
          <Routes>
            <Route path="/blocks" element={<Blocks />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/send" element={<Send />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
