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
  }, [user]);

  if (!user) return;

  function onToggleCreateChat() {
    setCreateChat(!createChat);
  }

  console.log({ contacts });

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
      <section className={styles.focus}>
        <div className={styles.wrapper}>
          {!contact && (
            <form className={styles.search}>
              <div className={styles.group}>
                <input
                  type='search'
                  name='search'
                  id='search'
                  className={styles.field}
                />
              </div>
              <div className={styles.group}>
                <button className={styles.submit}>Search</button>
              </div>
            </form>
          )}
          <section className={styles.display}>
            {!contact &&
              contacts.length > 0 &&
              contacts.map(contactObject => (
                <PreviousChat
                  key={contactObject.email}
                  email={contactObject.email}
                  lastMessage={'Hello World'}
                />
              ))}
          </section>
          {contact && <ChatBox />}
        </div>
        <article className={styles.bottom}>
          <>
            {!createChat && (
              <button className={styles.chat} onClick={onToggleCreateChat}>
                New Chat
              </button>
            )}
            {!contact && createChat && (
              <SearchBox onCreateChat={onToggleCreateChat} />
            )}
          </>
        </article>
      </section>
    </main>
  );
}

export default Main;
