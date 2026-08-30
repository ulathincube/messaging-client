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
import Logo from '../Logo';

function Login({
  onToggle,
  registeredEmail = '',
  onEnableWebSocket,
  webSocket,
}) {
  const [email, setEmail] = useState(registeredEmail);
  const [password, setPassword] = useState('');
  const [reset, setReset] = useState(false);
  const { onChangeStatus } = useStatus();
  const [showPassword, setShowPassword] = useState(false);

  const [, onChangeUser] = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ email, password }) => loginUser(email, password),
    onSuccess: data => {
      onChangeUser(data.data);
      onChangeStatus({ type: 'success', message: data.message });
      onEnableWebSocket();
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

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return createPortal(
    <div className={styles.backdrop}>
      {!reset && (
        <section className={styles.login}>
          <div className={styles.container}>
            <Logo />
            <article className={styles.parent}>
              <h2 className={styles.title}>
                Welcome back! Login into your account
              </h2>
            </article>
          </div>
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
            <div className={`${styles.group} ${styles.reveal}`}>
              <label className={styles.label} htmlFor='password'>
                Password
              </label>
              <input
                value={password}
                onChange={onPasswordChange}
                className={styles.field}
                type={showPassword ? 'text' : 'password'}
                id='password'
                required
              />
              <button
                type='button'
                onClick={toggleShowPassword}
                className={styles.show}
              >
                {!showPassword && (
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
                    <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'></path>
                    <line x1='1' y1='1' x2='23' y2='23'></line>
                  </svg>
                )}
                {showPassword && (
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
                    <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
                    <circle cx='12' cy='12' r='3'></circle>
                  </svg>
                )}
              </button>
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
              <Spacer marginTop={10}>
                <button
                  onClick={() => setReset(true)}
                  className={styles.forgot}
                >
                  Forgot Password? Reset here
                </button>
              </Spacer>
            </Spacer>
          </form>
          <div className={styles.aside}>
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
