import styles from './Login.module.css';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { createUser } from '../../services/user';
import { Link } from 'react-router';

function Login({ onToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUserHandler(event) {
    event.preventDefault();
    if (!email || !password) return;
    try {
      const response = await createUser(email, password);

      if (!response.ok) throw new Error('An error occurred');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      // toast?
      console.log(error);
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
          <div className={styles.group}>
            <button className={styles.submit}>Login</button>
          </div>
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
