import styles from './Main.module.css';
import { useState, useEffect } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import ChatBox from '../ChatBox';
import useContact from '../../hooks/useContact';
import PreviousChat from '../PreviousChat';
import { findUser, findContacts } from '../../services/user';
import useAuth from '../../hooks/useAuth';

function Main() {
  const [createChat, setCreateChat] = useState(false);
  const [contact] = useContact();
  const [chats, setChats] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);
  const [contacts, setContacts] = useState([]);

  const [user] = useAuth();

  useEffect(() => {
    if (!user) return;
    async function getChats() {
      // let emails = [];
      // try {
      //   // use prisma.message
      //   const response = await findUser(user.email);
      //   const { data, error, message } = await response.json();
      //   const allMessages = data.sentMessages
      //     .concat(data.receivedMessages)
      //     .sort(
      //       (currentMessage, nextMessage) =>
      //         new Date(currentMessage.sent_time) -
      //         new Date(nextMessage.sent_time),
      //     );
      //   if (allMessages.length === 0) return;
      //   const lastMessage_ = allMessages[allMessages.length - 1];
      //   setLastMessage(lastMessage_);
      //   // data.receivedMessages.sender, data.sentMessages.receiver
      //   for (let i = 0; i < data.receivedMessages.length; i++) {
      //     emails.push(data.receivedMessages[i].sender.email);
      //   }
      //   for (let j = 0; j < data.sentMessages.length; j++) {
      //     emails.push(data.sentMessages[j].receiver.email);
      //   }
      //   emails = [...new Set(emails)];
      //   setChats(emails);
      // } catch (error) {
      //   console.log(error);
      // }
    }

    async function runEffect() {
      const { email } = user;
      try {
        const response = await findContacts(email);
        const { data, error, messages } = await response.json();
        console.log({ data });
        setContacts(data);
      } catch (error) {
        console.log(error);
      }
    }

    runEffect();

    // getChats();
  }, [user]);

  if (!user) return;

  function onToggleCreateChat() {
    setCreateChat(!createChat);
  }

  return (
    <main className={styles.main}>
      <aside className={styles.sidebar}>
        {contacts.length > 0 &&
          contacts.map(contactObject => (
            <PreviousChat
              key={contactObject.email}
              email={contactObject.email}
              lastMessage={'Hello World'}
            />
          ))}
        {createChat ? (
          <div className={styles.new}>
            <SearchBox onCreateChat={onToggleCreateChat} />
          </div>
        ) : (
          <div className={styles.new}>
            <button className={styles.chat} onClick={onToggleCreateChat}>
              New Chat
            </button>
          </div>
        )}
      </aside>
      <section className={styles.focus}>{contact && <ChatBox />}</section>
    </main>
  );
}

export default Main;
