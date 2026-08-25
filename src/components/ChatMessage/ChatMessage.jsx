import styles from './ChatMessage.module.css';
import { formatTime } from '../../lib/dayjs';
import useAuth from '../../hooks/useAuth';

function ChatMessage({ chatMessage }) {
  //sender left, receiver right
  // const chatTime = `${new Date(chatMessage.sent_time).getHours()}:${new Date(chatMessage.sent_time).getMinutes()}`;
  const [user] = useAuth();
  const { userId } = user;
  const chatTime = formatTime(chatMessage.sent_time);
  const senderId = 1;

  const bubbleStyles =
    userId === chatMessage.senderId ? styles.right : styles.left;
  return (
    <div className={`${styles.chat} ${bubbleStyles}`}>
      <p className={styles.text}>{chatMessage.message_text}</p>
      <p className={styles.time}>{chatTime}</p>
    </div>
  );
}

export default ChatMessage;
