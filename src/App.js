import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components and pages
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Database from './pages/database/Database';
import AwardsJudged from './pages/awardsJudged/AwardsJudged'
import Difficulty from './pages/difficulty/Difficulty'
import PastWinners from './pages/pastWinners/PastWinners'

// styles
import './App.css';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/database" element={<Database />} />
          <Route path="/awards-judged" element={<AwardsJudged />} />
          <Route path="/difficulty" element={<Difficulty />} />
          <Route path="/winners" element={<PastWinners />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
