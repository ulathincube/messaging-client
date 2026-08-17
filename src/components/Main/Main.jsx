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
  const [email, setEmail] = useState('');
  const [person, setPerson] = useState(null);
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
        setPerson(null);
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

  function onRemovePerson() {
    setPerson(null);
  }

  async function searchUserHandler(event) {
    event.preventDefault();
    try {
      const response = await findUser(email);
      const { data, error, message } = await response.json();
      if (!data) return;
      console.log({ data, error, message });
      setPerson(data);
      setContacts([]);
    } catch (error) {
      console.log(error);
    }
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
            <form onSubmit={searchUserHandler} className={styles.search}>
              <div className={styles.group}>
                <input
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  type='email'
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
            {person && (
              <PreviousChat
                email={person.email}
                lastMessage={'Hello World'}
                onRemovePerson={onRemovePerson}
              />
            )}
          </section>
          {contact && <ChatBox />}
        </div>
        <article className={styles.bottom}>
          <>
            {!createChat && !contact && (
              <button className={styles.chat} onClick={onToggleCreateChat}>
                New Chat
              </button>
            )}
            {!contact && createChat && (
              <div className={styles.flex}>
                <SearchBox onCreateChat={onToggleCreateChat} />
              </div>
            )}
          </>
        </article>
      </section>
    </main>
  );
}

export default Main;
