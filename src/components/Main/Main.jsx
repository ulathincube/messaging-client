import styles from './Main.module.css';
import { useState, useEffect } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import ChatBox from '../ChatBox';
import useContact from '../../hooks/useContact';
import PreviousChat from '../PreviousChat';
import { findUser } from '../../services/user';
import useAuth from '../../hooks/useAuth';

function Main() {
  const [createChat, setCreateChat] = useState(false);
  const [contact] = useContact();
  const [chats, setChats] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);

  const [user] = useAuth();

  useEffect(() => {
    if (!user) return;
    async function getChats() {
      let emails = [];

      try {
        // use prisma.message
        const response = await findUser(user.email);

        const { data, error, message } = await response.json();

        const allMessages = data.sentMessages
          .concat(data.receivedMessages)
          .sort(
            (currentMessage, nextMessage) =>
              new Date(currentMessage.sent_time) -
              new Date(nextMessage.sent_time),
          );

        if (allMessages.length === 0) return;

        const lastMessage_ = allMessages[allMessages.length - 1];
        setLastMessage(lastMessage_);

        // data.receivedMessages.sender, data.sentMessages.receiver
        for (let i = 0; i < data.receivedMessages.length; i++) {
          emails.push(data.receivedMessages[i].sender.email);
        }
        for (let j = 0; j < data.sentMessages.length; j++) {
          emails.push(data.sentMessages[j].receiver.email);
        }

        emails = [...new Set(emails)];
        setChats(emails);
      } catch (error) {
        console.log(error);
      }
    }

    getChats();
  }, [user?.email, user]);

  if (!user) return;

  function onToggleCreateChat() {
    setCreateChat(!createChat);
  }

  return (
    <main className={styles.main}>
      <aside className={styles.sidebar}>
        {chats.map(chatEmail => (
          <PreviousChat
            key={chatEmail}
            email={chatEmail}
            lastMessage={lastMessage}
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
