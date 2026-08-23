import Profile from './pages/Profile';
import Home from './pages/Home';
import Users from './pages/Users';
import { Routes, Route } from 'react-router';
import Messages from './pages/Messages';
import ContactContext from './store/contact';
import StatusContext from './store/status';
import AuthContext from './store/auth';
import { useState, useMemo, useEffect } from 'react';
import Authenticate from './pages/Authenticate';
import Protected from './components/Protected';
import Toast from './components/Toast';
import Loader from './components/Loader';
import { wakeServerUp } from './services';

function App() {
  const [contact, setContact] = useState(null);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function runEffect() {
      await wakeServerUp();
    }

    runEffect();
  }, []);

  function onChangeContact(newContact) {
    setContact(newContact);
  }

  function onChangeUser(newUser) {
    setUser(newUser);
  }

  function onChangeStatus(newStatus) {
    setStatus(newStatus);
    setTimeout(() => {
      setStatus(null);
    }, 5000);
  }

  function onChangeMessage(newMessage) {
    setMessage(newMessage);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }

  const userValue = useMemo(() => {
    return [user, onChangeUser];
  }, [user]);

  const contactValue = useMemo(() => {
    return [contact, onChangeContact];
  }, [contact]);

  const statusValue = useMemo(() => {
    return { status, onChangeStatus, message, onChangeMessage };
  }, [status, message]);

  return (
    <AuthContext value={userValue}>
      <ContactContext value={contactValue}>
        <StatusContext value={statusValue}>
          <Loader />
          <Toast />
          <Routes>
            <Route path='auth' element={<Authenticate />}></Route>
            <Route element={<Protected />}>
              <Route path='/' element={<Home />} />
              <Route path='users' element={<Users />} />
              <Route path='profile' element={<Profile />} />
              <Route path='messages' element={<Messages />}></Route>
            </Route>
          </Routes>
        </StatusContext>
      </ContactContext>
    </AuthContext>
  );
}

export default App;
