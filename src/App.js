import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// components and pages
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Database from './pages/database/Database';
import AwardsJudged from './pages/awardsJudged/AwardsJudged'
import Difficulty from './pages/difficulty/Difficulty'
import Entry from './pages/create/Entry'
import Adjudicator from './pages/create/Adjudicator';
import Award from './pages/create/Award';
import Year from './pages/create/Year';
import Login from './pages/login/Login'

// styles
import './App.css';



function App() {
  const { user, authIsReady } = useAuthContext()
  return (
    <div className="App">
      {authIsReady &&
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/database" element={<Database />} />
            <Route path="/awards-judged" element={<AwardsJudged />} />
            <Route path="/difficulty" element={<Difficulty />} />
            <Route path="/create/entry" element={user ? <Entry /> : <Navigate to="/" />} />
            <Route path="/create/adjudicator" element={user ? <Adjudicator /> : <Navigate to="/" />} />
            <Route path="/create/award" element={user ? <Award /> : <Navigate to="/" />} />
            <Route path="/create/year" element={user ? <Year /> : <Navigate to="/" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;
