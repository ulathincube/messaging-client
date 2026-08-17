import Profile from './pages/Profile';
import Home from './pages/Home';
import Users from './pages/Users';
import { Routes, Route } from 'react-router';
import Messages from './pages/Messages';
import ContactContext from './store/contact';
import AuthContext from './store/auth';
import { useState, useMemo } from 'react';
import Authenticate from './pages/Authenticate';
import Protected from './components/Protected';

function App() {
  const [contact, setContact] = useState(null);
  const [user, setUser] = useState(null);

  function onChangeContact(newContact) {
    setContact(newContact);
  }

  function onChangeUser(newUser) {
    setUser(newUser);
  }

  const userValue = useMemo(() => {
    return [user, onChangeUser];
  }, [user]);

  const contactValue = useMemo(() => {
    return [contact, onChangeContact];
  }, [contact]);

  return (
    <AuthContext value={userValue}>
      <ContactContext value={contactValue}>
        <Routes>
          <Route path='auth' element={<Authenticate />}></Route>
          <Route element={<Protected />}>
            <Route path='/' element={<Home />} />
            <Route path='users' element={<Users />} />
            <Route path='profile' element={<Profile />} />
            <Route path='messages' element={<Messages />}></Route>
          </Route>
        </Routes>
      </ContactContext>
    </AuthContext>
  );
}

export default App;
