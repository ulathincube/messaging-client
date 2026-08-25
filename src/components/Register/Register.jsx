import styles from './Register.module.css';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { createUser } from '../../services/user';
import Spacer from '../Spacer';
import useStatus from '../../hooks/useStatus';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';

function Register({ onToggle, onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onChangeStatus } = useStatus();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ email, password }) => createUser(email, password),
    onSuccess: data => {
      onChangeStatus({ type: 'success', message: data.data.message });
      onRegister(email);
      navigate('/login');
    },
    onError: error => {
      onChangeStatus({ type: 'error', message: error.message });
    },
  });

  async function registerUserHandler(event) {
    event.preventDefault();
    if (!email || !password) return;
    mutation.mutate({ email, password });
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
              <button className={styles.submit}>
                <span className={styles.text}>Register</span>
                <span className={styles.icon}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path>
                    <circle cx='8.5' cy='7' r='4'></circle>
                    <line x1='20' y1='8' x2='20' y2='14'></line>
                    <line x1='23' y1='11' x2='17' y2='11'></line>
                  </svg>
                </span>
              </button>
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
