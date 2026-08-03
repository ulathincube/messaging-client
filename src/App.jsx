import Header from './components/Header';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Users from './pages/Users';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path='users' element={<Users />} />
          <Route path='profile' element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
