import Profile from './pages/Profile';
import Home from './pages/Home';
import Users from './pages/Users';
import { Routes, Route } from 'react-router';
import Messages from './pages/Messages';
import ContactContext from './store/contact';
import StatusContext from './store/status';
import AuthContext from './store/auth';
import SocketContext from './store/socket';
import { useState, useMemo, useEffect } from 'react';
import Authenticate from './pages/Authenticate';
import Protected from './components/Protected';
import Toast from './components/Toast';
import Loader from './components/Loader';
import { wakeServerUp } from './services';
import { io } from 'socket.io-client';

function App() {
  const [contact, setContact] = useState(null);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [webSocket, setWebSocket] = useState(false);
  const [socket, setSocket] = useState({});

  useEffect(() => {
    async function runEffect() {
      try {
        await wakeServerUp();
      } catch (error) {
        onChangeStatus({ type: 'error', message: error.message });
      }
    }

    runEffect();
  }, []);

  // useEffect(() => {
  //   function runEffect() {
  //     if (webSocket) {
  //       const socket = io('ws://localhost:5000');
  //       onChangeSocket(socket);
  //       console.log({ socket });
  //     }
  //   }

  //   runEffect();

  //   return () => {};
  // }, [webSocket]);

  function onChangeContact(newContact) {
    setContact(newContact);
  }

  function onChangeSocket(websocket) {
    setSocket(websocket);
  }

  function onEnableWebSocket() {
    setWebSocket(true);
  }

  function onDisableWebSocket() {
    setWebSocket(false);
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

  const userValue = useMemo(() => {
    return [user, onChangeUser];
  }, [user]);

  const contactValue = useMemo(() => {
    return [contact, onChangeContact];
  }, [contact]);

  const statusValue = useMemo(() => {
    return { status, onChangeStatus };
  }, [status]);

  const socketValue = useMemo(() => {
    return { socket, onChangeSocket };
  }, [socket]);

  return (
    <AuthContext value={userValue}>
      <ContactContext value={contactValue}>
        <SocketContext value={socketValue}>
          <StatusContext value={statusValue}>
            <Loader />
            <Toast />
            <Routes>
              <Route
                path='auth'
                element={
                  <Authenticate
                    webSocket={webSocket}
                    onEnableWebSocket={onEnableWebSocket}
                    onDisableWebSocket={onDisableWebSocket}
                  />
                }
              />
              <Route element={<Protected />}>
                <Route path='/' element={<Home />} />
                <Route path='users' element={<Users />} />
                <Route path='profile' element={<Profile />} />
                <Route path='messages' element={<Messages />} />
              </Route>
            </Routes>
          </StatusContext>
        </SocketContext>
      </ContactContext>
    </AuthContext>
  );
}

export default App;
