import styles from './ChatBox.module.css';
import useContact from '../../hooks/useContact';
import ChatMessage from '../ChatMessage/ChatMessage';
import { useState, useEffect } from 'react';
import { createMessage } from '../../services/message';
import { findChats } from '../../services/user';
import useAuth from '../../hooks/useAuth';

function ChatBox() {
  const [contact] = useContact();
  const [message, setMessage] = useState('');
  const [user] = useAuth();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    async function runEffect() {
      try {
        console.log(contact.email);
        const response = await findChats(user.email, contact.email);

        const { data, error, message: message_ } = await response.json();
        console.log({ data, error, message_ });
        if (!data) setChats([]);
        setChats([...data]);
      } catch (error) {
        console.log(error);
      }
    }

    runEffect();
  }, [user.email, contact.email]);

  function onMessageChange({ target: { value } }) {
    setMessage(value);
  }

  async function onSendMessage(event) {
    event.preventDefault();

    try {
      const response = await createMessage(message, user.email, contact.email);

      const { data, error, message: message_ } = await response.json();
      console.log({ data, error, message_ });
      setChats(currentChats => [...currentChats, data]);
      setMessage('');
    } catch (error) {
      if (error) throw error;
    }
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.contact}>{contact.email}</div>
      <article className={styles.chats}>
        {chats.length > 0 &&
          chats.map(chatObject => (
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
            Send
          </button>
        </div>
      </form>
    </section>
  );
}

export default ChatBox;
