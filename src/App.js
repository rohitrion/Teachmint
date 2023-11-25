
import './App.css';
import Timer from './Component/Clock/Timer';
import Posts from './Component/Detailpage/Posts';
import Home from './Component/Home/Home';
import { Routes, Route, Link, useNavigate, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Posts />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
