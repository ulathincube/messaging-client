import styles from './PreviousChat.module.css';
import useContact from '../../hooks/useContact';

function PreviousChat({
  email,
  lastMessage,
  onRemovePerson = () => {},
  contact,
}) {
  const [, onChangeContact] = useContact();

  const active = contact?.email === email ? styles.active : '';
  const firstLetter = email.charAt(0).toUpperCase();

  function selectUser() {
    console.log('contact selected!');
    onChangeContact(contact);
  }

  return (
    <li className={`${styles.wrapper} ${active}`}>
      <button onClick={selectUser} className={styles.chat}>
        <h3 className={styles.user}>
          <span className={styles.avatar}>{firstLetter}</span>
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
