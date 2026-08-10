import styles from './SearchBox.module.css';
import { useState } from 'react';
import { findUser } from '../../services/user';
import useContact from '../../hooks/useContact';

function SearchBox({ onCreateChat }) {
  const [email, setEmail] = useState('');
  const [contact, onChangeContact] = useContact();
  const [user, setUser] = useState(null);

  function onEmailChange({ target: { value } }) {
    setEmail(value);
  }

  async function onSearchHandler(event) {
    event.preventDefault();

    try {
      const response = await findUser(email);

      const { data, error, message } = await response.json();
      console.log({ error, message });
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  function onSelectUser() {
    onChangeContact({ ...user });
    onCreateChat();
  }

  return (
    <article className={styles.wrapper}>
      <form className={styles.form} onSubmit={onSearchHandler}>
        <div className={styles.group}>
          <label className={styles.title} htmlFor='search'>
            Search User
          </label>
          <input
            value={email}
            type='email'
            id='search'
            placeholder='janedoe@mail.com'
            required
            onChange={onEmailChange}
            className={styles.search}
          />
        </div>
        <div className={styles.actions}>
          <button type='submit' className={styles.button}>
            Search
          </button>
          <button
            onClick={onCreateChat}
            type='button'
            className={styles.cancel}
          >
            Cancel
          </button>
        </div>
      </form>
      {user && (
        <section className={styles.display}>
          <div className={styles.result}>
            <button onClick={onSelectUser} className={styles.select}>
              {user.email}
            </button>
          </div>
        </section>
      )}
      {/* {email && !contact && <div className={styles.error}>No user found!</div>} */}
    </article>
  );
}

export default SearchBox;
