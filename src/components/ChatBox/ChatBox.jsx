import styles from './ChatBox.module.css';
import useContact from '../../hooks/useContact';
import ChatMessage from '../ChatMessage/ChatMessage';
import { useState } from 'react';
import { createMessage } from '../../services/message';

function ChatBox() {
  const [contact] = useContact();
  const [message, setMessage] = useState('');

  const allMessages = contact.sentMessages
    .concat(contact.receivedMessages)
    .sort(
      (currentMessage, nextMessage) =>
        new Date(currentMessage.sent_time) - new Date(nextMessage.sent_time),
    );

  function onMessageChange({ target: { value } }) {
    setMessage(value);
  }

  async function onSendMessage(event) {
    event.preventDefault();

    try {
      const response = await createMessage(
        message,
        'fakeuser@yahoo.com',
        'realuser@yahoo.com',
      );

      const data = await response.json();
      console.log(data);
      setMessage('');
    } catch (error) {
      if (error) throw error;
    }
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.contact}>{contact.email}</div>
      <article className={styles.chats}>
        {allMessages.map(chatObject => (
          <ChatMessage key={chatObject.message_id} chatMessage={chatObject} />
        ))}
      </article>
      <form className={styles.chat}>
        <div className={styles.group}>
          {/* <input
            value={message}
            onChange={onMessageChange}
            type='text'
            className={styles.message}
            placeholder='Say Hi!'
          /> */}
          <textarea
            value={message}
            onChange={onMessageChange}
            className={styles.message}
          >
            Say Hi!
          </textarea>
        </div>
        <div className={styles.group}>
          <button onClick={onSendMessage} className={styles.submit}>
            Send Message
          </button>
        </div>
      </form>
    </section>
  );
}

export default ChatBox;
