import styles from './EditProfile.module.css';
import { editProfile } from '../../services/profile';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { getProfileStatus } from '../../services/profile';

function EditProfile() {
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  const [user] = useAuth();

  useEffect(() => {
    const { email } = user;
    async function runEffect() {
      const response = await getProfileStatus(email);
      const { data, message, error } = await response.json();
      console.log({ data, message, error });

      if (data && data.status) setStatus(data.status);
    }

    runEffect();
  }, [user]);

  console.log({ user });

  function onChangeStatus({ target: { value } }) {
    setStatus(value);
  }

  async function onSubmitStatus(event) {
    event.preventDefault();

    try {
      const response = await editProfile(user.email, status);
      const { data, error, message } = await response.json();
      console.log(data, error, message);
      navigate('/');
    } catch (error) {
      if (error) throw error;
    }
  }

  return (
    <article className={styles.wrapper}>
      <h2 className={styles.caption}>Edit Profile</h2>
      <form onSubmit={onSubmitStatus} className={styles.form}>
        <div className={styles.group}>
          <label className={styles.label} htmlFor='status'>
            Status
          </label>
          <input
            value={status}
            onChange={onChangeStatus}
            className={styles.field}
            type='text'
            id='status'
            placeholder='Available'
            name='status'
            required
          />
        </div>
        <div className={styles.actions}>
          <button className={styles.submit}>Make Changes</button>
        </div>
      </form>
    </article>
  );
}

export default EditProfile;
