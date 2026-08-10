import styles from './EditProfile.module.css';
import { editProfile } from '../../services/profile';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function EditProfile() {
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  function onChangeStatus({ target: { value } }) {
    setStatus(value);
  }

  async function onSubmitStatus(event) {
    event.preventDefault();

    try {
      const response = await editProfile('fakeuser@yahoo.com', status);
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
