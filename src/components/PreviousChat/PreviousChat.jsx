import styles from './PreviousChat.module.css';
import useContact from '../../hooks/useContact';

function PreviousChat({ contact, email, lastMessage }) {
  const [currentContact, onChangeContact] = useContact();

  const active = currentContact?.email === email ? styles.active : '';
  const firstLetter = email.charAt(0).toUpperCase();

  function selectUser() {
    onChangeContact(contact);
    // console.log({ currentContact, contact });
  }

  return (
    <li className={`${styles.wrapper} ${active}`}>
      <button onClick={selectUser} className={styles.chat}>
        <h3 className={styles.user}>
          {/* <span className={styles.avatar}>{firstLetter}</span> */}
          <span className={styles.avatar}>
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
              <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
              <circle cx='12' cy='7' r='4'></circle>
            </svg>
          </span>
          <div className={styles.details}>
            <span className={styles.email}>{email}</span>
            <span className={styles.hint}>{lastMessage}</span>
          </div>
        </h3>
      </button>
    </li>
  );
}

export default PreviousChat;
