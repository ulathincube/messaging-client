import styles from './Register.module.css';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { createUser } from '../../services/user';
import { Link } from 'react-router';
import Spacer from '../Spacer';

function Register({ onToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUserHandler(event) {
    event.preventDefault();
    if (!email || !password) return;
    try {
      const response = await createUser(email, password);

      if (!response.ok) throw new Error('An error occurred');
      const data = await response.json();
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
      <section className={styles.register}>
        <article>
          <h2 className={styles.title}>Register</h2>
        </article>
        <form className={styles.form} onSubmit={registerUserHandler}>
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
              <button className={styles.submit}>Register</button>
            </div>
          </Spacer>
        </form>
        <div className={styles.aside}>
          <button onClick={onToggle} className={styles.action}>
            Already have an account? Login here
          </button>
        </div>
      </section>
    </div>,
    document.getElementById('auth'),
  );
}

export default Register;
