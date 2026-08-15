import styles from './PreviousChat.module.css';
import useContact from '../../hooks/useContact';
import { findUser } from '../../services/user';

function PreviousChat({ email, lastMessage }) {
  const [contact, onChangeContact] = useContact();

  const active = contact?.email === email ? styles.active : '';

  async function loadChats() {
    try {
      const response = await findUser(email);
      const { data, error, message } = await response.json();
      if (data !== null) {
        onChangeContact(data);
        console.log(error, message);
      }
    } catch (error) {
      if (error) throw error;
    }
  }

  return (
    <li className={`${styles.wrapper} ${active}`}>
      <button onClick={loadChats} className={styles.chat}>
        <h3 className={styles.user}>{email}</h3>
        <p className={styles.hint}>{lastMessage.message_text}</p>
      </button>
    </li>
  );
}

export default PreviousChat;
