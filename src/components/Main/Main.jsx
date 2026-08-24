import styles from './Main.module.css';
import { useState, useEffect } from 'react';
import ChatBox from '../ChatBox';
import useContact from '../../hooks/useContact';
import PreviousChat from '../PreviousChat';
import { findUser, findAllUsers } from '../../services/user';
import useAuth from '../../hooks/useAuth';

function Main() {
  const [contact] = useContact();

  const [contacts, setContacts] = useState([]);
  const [email, setEmail] = useState('');
  const [person, setPerson] = useState(null);
  const [user] = useAuth();

  useEffect(() => {
    if (!user) return;

    async function runEffect() {
      const { email } = user;
      try {
        const response = await findAllUsers();
        const { data, error, message } = await response.json();
        console.log({ data, error, message });
        const filteredContacts = data.filter(
          personObject => personObject.email !== email,
        );
        setContacts(filteredContacts);
        setPerson(null);
      } catch (error) {
        console.log(error);
      }
    }

    runEffect();
  }, [user]);

  if (!user) return;

  // function onToggleCreateChat() {
  //   setCreateChat(!createChat);
  // }

  function onRemovePerson() {
    setPerson(null);
  }

  function onEmailChange(event) {
    setEmail(event.target.value);
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
        <article className={styles.chats}>
          <h2 className={styles.title}>
            <span className={styles.text}>Chats</span>
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
                <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'></path>
              </svg>
            </span>
          </h2>
          <ul className={styles.list}>
            {contacts.length > 0 &&
              contacts.map(contactObject => (
                <PreviousChat
                  key={contactObject.email}
                  email={contactObject.email}
                  lastMessage={'Hello World'}
                />
              ))}
          </ul>
        </article>
        {/* {createChat ? (
          <div className={styles.new}>
            <SearchBox onCreateChat={onToggleCreateChat} />
          </div>
        ) : (
          <div className={styles.new}>
            <button className={styles.create} onClick={onToggleCreateChat}>
              <span className={styles.text}>New Chat</span>
              <span className={styles.icon}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='feather feather-message-circle'
                >
                  <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'></path>
                </svg>
              </span>
            </button>
          </div>
        )} */}
      </aside>
      <section className={styles.focus}>
        <div className={styles.wrapper}>
          {!contact && (
            <form onSubmit={searchUserHandler} className={styles.search}>
              <div className={styles.group}>
                <input
                  value={email}
                  onChange={onEmailChange}
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
            {!contact && contacts.length > 0 && (
              <article className={styles.chats}>
                <h2 className={styles.title}>
                  <span className={styles.text}>Chats</span>
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
                      <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'></path>
                    </svg>
                  </span>
                </h2>
                {contacts.map(contactObject => (
                  <PreviousChat
                    key={contactObject.email}
                    email={contactObject.email}
                    lastMessage={'Hello World'}
                  />
                ))}
              </article>
            )}
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
            {/* {!createChat && !contact && (
              <button className={styles.chat} onClick={onToggleCreateChat}>
                New Chat
              </button>
            )} */}
            {/* {!contact && (
              <div className={styles.flex}>
                <MobileSearchBox onCreateChat={onToggleCreateChat} />
              </div>
            )} */}
          </>
        </article>
      </section>
    </main>
  );
}

export default Main;
