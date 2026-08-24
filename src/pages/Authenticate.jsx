import Login from '../components/Login';
import Register from '../components/Register';
import { useState, useEffect } from 'react';

function toggleVisibility(visibility = true) {
  if (visibility) {
    document.body.style.overflowY = 'hidden';
    document.getElementById('auth').style.minHeight = '100%';
  } else {
    document.body.style.overflowY = 'visible';
    document.getElementById('auth').style.removeProperty('min-height');
  }
}

function Authenticate() {
  // login => app // register => login
  const [register, setRegister] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  function onRegister(providedEmail) {
    setRegisteredEmail(providedEmail);
  }

  useEffect(() => {
    toggleVisibility();
    return () => toggleVisibility(false);
  }, []);

  function toggleAuthentication() {
    setRegister(!register);
  }

  return register ? (
    <Register onRegister={onRegister} onToggle={toggleAuthentication} />
  ) : (
    <Login registeredEmail={registeredEmail} onToggle={toggleAuthentication} />
  );
}

export default Authenticate;
