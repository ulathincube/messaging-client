import styles from './Login.module.css';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { loginUser } from '../../services/user';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import Spacer from '../Spacer';
import useStatus from '../../hooks/useStatus';

function Login({ onToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status, onChangeStatus, message, onChangeMessage } = useStatus();
  // idle, loading, error, success
  const [user, onChangeUser] = useAuth();
  const navigate = useNavigate();

  async function loginUserHandler(event) {
    event.preventDefault();
    if (!email || !password) {
      onChangeStatus('error');
      onChangeMessage('Invalid login details');
      return;
    }
    try {
      const response = await loginUser(email, password);

      if (!response.ok) {
        onChangeStatus('error');
        onChangeMessage(response.statusText);
        return;
      }
      const { data, error, message } = await response.json();

      if (!error) {
        onChangeStatus('success');
        onChangeMessage(message);
        onChangeUser(data);
        navigate('/');
      } else {
        onChangeStatus('error');
        onChangeMessage(message);
      }
    } catch (error) {
      onChangeStatus('error');
      onChangeMessage('Unable to login at this time!');
    }
  }

  function onEmailChange({ target: { value } }) {
    setEmail(value);
  }

  function onPasswordChange({ target: { value } }) {
    setPassword(value);
  }

  return createPortal(
    <div className={styles.backdrop}>
      <section className={styles.login}>
        <article>
          <h2 className={styles.title}>Login</h2>
        </article>
        <form className={styles.form} onSubmit={loginUserHandler}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor='email'>
              Email Address
            </label>
            <input
              value={email}
              onChange={onEmailChange}
              className={styles.field}
              type='email'
              id='email'
              placeholder='janedoe@mail.com'
              required
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label} htmlFor='password'>
              Password
            </label>
            <input
              value={password}
              onChange={onPasswordChange}
              className={styles.field}
              type='password'
              id='password'
              required
            />
          </div>
          <Spacer marginTop={5}>
            <div className={styles.group}>
              <button className={styles.submit}>Login</button>
            </div>
          </Spacer>
        </form>
        <div className={styles.aside}>
          <button onClick={onToggle} className={styles.action}>
            Don't have an account? Register here
          </button>
        </div>
      </section>
    </div>,
    document.getElementById('auth'),
  );
}

export default Login;
