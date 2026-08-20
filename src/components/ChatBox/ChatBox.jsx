import styles from './ChatBox.module.css';
import useContact from '../../hooks/useContact';
import ChatMessage from '../ChatMessage/ChatMessage';
import { useState, useEffect } from 'react';
import { createMessage } from '../../services/message';
import { findChats } from '../../services/user';
import { getProfileStatus } from '../../services/profile';
import useAuth from '../../hooks/useAuth';

function ChatBox() {
  const [contact] = useContact();
  const [message, setMessage] = useState('');
  const [user] = useAuth();
  const [chats, setChats] = useState([]);
  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    async function runEffect() {
      try {
        console.log(contact.email);
        const response = await findChats(user.email, contact.email);
        const { data, error, message: message_ } = await response.json();

        const res = await getProfileStatus(contact.email);
        const {
          data: data_,
          error: error_,
          message: _message,
        } = await res.json();

        console.log({ data, error, message_ });
        console.log({ data_, error_, _message });

        if (!data) setChats([]);
        setChats([...data]);
        if (!data_) setUserStatus('Available');
        setUserStatus(data_.status);
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

  const firstLetter = contact.email.charAt(0).toUpperCase();

  return (
    <section className={styles.wrapper}>
      <div className={styles.contact}>
        <div className={styles.flex}>
          <div className={styles.avatar}>
            <span>{firstLetter}</span>
          </div>
        </div>
        <div className={styles.details}>
          <span className={styles.name}>{contact.email}</span>
          <span className={styles.status}>{userStatus}</span>
        </div>
      </div>
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
            placeholder='Say Hello!'
          ></textarea>
        </div>
        <div className={styles.group}>
          <button onClick={onSendMessage} className={styles.submit}>
            <span className={styles.text}>Send</span>
            <span className={styles.icon}>
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
                <line x1='22' y1='2' x2='11' y2='13'></line>
                <polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
              </svg>
            </span>
          </button>
        </div>
      </form>
    </section>
  );
}

export default ChatBox;
