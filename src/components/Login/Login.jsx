import styles from './Login.module.css';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { loginUser } from '../../services/user';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import Spacer from '../Spacer';
import useStatus from '../../hooks/useStatus';
import { useMutation } from '@tanstack/react-query';
import ResetPassword from '../ResetPassword';

function Login({ onToggle, registeredEmail = '' }) {
  const [email, setEmail] = useState(registeredEmail);
  const [password, setPassword] = useState('');
  const [reset, setReset] = useState(false);
  const { onChangeStatus } = useStatus();

  const [, onChangeUser] = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ email, password }) => loginUser(email, password),
    retry: 3,
    onSuccess: data => {
      onChangeUser(data.data);
      onChangeStatus({ type: 'success', message: data.message });
      navigate('/');
    },
    onError: error => {
      onChangeUser(null);
      onChangeStatus({ type: 'error', message: error.message });
    },
  });
  // idle, loading, error, success

  async function loginUserHandler(event) {
    event.preventDefault();
    onChangeStatus({ type: 'loading', message: '' });
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
      {!reset && (
        <section className={styles.login}>
          <article>
            <h2 className={styles.title}>
              Welcome back! Login into your account
            </h2>
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
                <button className={styles.submit}>
                  <span className={styles.text}>Login</span>
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
                      <path d='M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4'></path>
                      <polyline points='10 17 15 12 10 7'></polyline>
                      <line x1='15' y1='12' x2='3' y2='12'></line>
                    </svg>
                  </span>
                </button>
              </div>
            </Spacer>
          </form>
          <div className={styles.aside}>
            <button onClick={() => setReset(true)} className={styles.action}>
              Forgot Password? Reset here
            </button>
            <button onClick={onToggle} className={styles.action}>
              Don't have an account? Register here
            </button>
          </div>
        </section>
      )}
      {reset && (
        <ResetPassword email={email} onToggleReset={() => setReset(false)} />
      )}
    </div>,
    document.getElementById('auth'),
  );
}

export default Login;
