import styles from './ResetPassword.module.css';
import { useId, useState } from 'react';
import { resetPassword } from '../../services/user';
import { useMutation } from '@tanstack/react-query';
import useStatus from '../../hooks/useStatus';
import { useNavigate } from 'react-router';
import Logo from '../Logo';

function ResetPassword({ email = '', onToggleReset }) {
  const instanceId = useId();
  const inputId = `password-${instanceId}`;
  const [password, setPassword] = useState('');
  const { onChangeStatus } = useStatus();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ email, password }) => resetPassword({ email, password }),
    onSuccess: data => {
      navigate('/auth');
      onChangeStatus({ type: 'success', message: data.message });
      onToggleReset();
    },
    onError: error => {
      onChangeStatus({ type: 'error', message: error.message });
    },
  });

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  function onSubmitReset(event) {
    event.preventDefault();
    if (!email || !password) return;
    onChangeStatus({ type: 'loading', message: '' });
    mutation.mutate({ email, password });
  }

  return (
    <section className={styles.reset}>
      <div className={styles.container}>
        <Logo />
        <article className={styles.parent}>
          <h2 className={styles.title}>Welcome back! Reset your password</h2>
        </article>
      </div>
      <form className={styles.form} onSubmit={onSubmitReset}>
        <div className={styles.group}>
          <label className={styles.label} htmlFor={inputId}>
            Password
          </label>
          <input
            className={styles.field}
            type='password'
            id={inputId}
            name='password'
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <div className={styles.action}>
          <button className={styles.submit}>Reset Password</button>
          <button onClick={onToggleReset} className={styles.cancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default ResetPassword;
