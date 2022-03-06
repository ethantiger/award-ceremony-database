import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { useCollection } from './hooks/useCollection'
import { useDocument } from './hooks/useDocument'

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
import FormAwards from './pages/create/FormAwards';
import FormChoices from './pages/FormChoices/FormChoices';

// styles
import './App.css';



function App() {
  const { user, authIsReady } = useAuthContext()
  const { documents: entries } = useCollection('award-entry',null,['createdAt', 'desc'])
  const { document: difficulty } = useDocument('award-difficulty', 'hoxAT5NRUuol306P6CcV')
  const { document: info } = useDocument('award-info', '3RWf2J0uS8BX4MIsPU87')
  const { document: form } = useDocument('award-form', '5l1hf9Mg33jRNyMHCZpd')

  return (
    <div className="App">
      {authIsReady &&
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/database" element={<Database entries={entries} info={info}/>} />
            <Route path="/awards-judged" element={<AwardsJudged entries={entries} info={info}/>} />
            <Route path="/difficulty" element={<Difficulty info={info} entries={entries}/>} />
            <Route path="/choices" element={<FormChoices form={form}/>} />
            <Route path="/create/entry" element={user ? <Entry info={info} diff={difficulty}/> : <Navigate to="/" />} />
            <Route path="/create/adjudicator" element={user ? <Adjudicator info={info} entries={entries}/> : <Navigate to="/" />} />
            <Route path="/create/award" element={user ? <Award info={info} diff={difficulty}/> : <Navigate to="/" />} />
            <Route path="/create/year" element={user ? <Year info={info}/> : <Navigate to="/" />} />
            <Route path="/create/form-award" element={user ? <FormAwards info={info} form={form}/> : <Navigate to="/" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;
