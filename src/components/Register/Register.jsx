import styles from './Register.module.css';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { createUser } from '../../services/user';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUserHandler(event) {
    event.preventDefault();
    if (!email || !password) return;
    try {
      const response = await createUser(email, password);

      if (!response.ok) throw new Error();
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
              onChange={onEmailChange}
              className={styles.field}
              type='email'
              id='email'
              placeholder='janedoe@mail.com'
              required
            />
          </div>
          <div className={styles.group}>
            <label htmlFor='password'>Password</label>
            <input
              onChange={onPasswordChange}
              className={styles.field}
              type='password'
              id='password'
              required
            />
          </div>
          <div className={styles.group}>
            <button className={styles.submit}>Register</button>
          </div>
        </form>
      </section>
    </div>,
    document.getElementById('auth'),
  );
}

export default Register;
