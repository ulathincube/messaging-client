import styles from './Main.module.css';
import { useState } from 'react';
import ChatBox from '../ChatBox';
import useContact from '../../hooks/useContact';
import PreviousChat from '../PreviousChat';
import { findAllUsers } from '../../services/user';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useStatus from '../../hooks/useStatus';

function Main() {
  const [contact] = useContact();
  const [contacts, setContacts] = useState([]);
  const [email, setEmail] = useState('');
  const [user] = useAuth();
  const { onChangeStatus } = useStatus();

  const { data, error, isLoading } = useQuery({
    queryKey: ['findAllUsers'],
    queryFn: () => {
      if (isLoading) {
        onChangeStatus({ type: 'loading', message: '' });
      }

      if (error) {
        onChangeStatus({ type: 'error', message: error.message });
      }

      return findAllUsers();
    },
  });

  function onEmailChange(event) {
    const nextValue = event.target.value;
    if (!nextValue) return;
    const nextContacts = contacts.filter(
      contactObject => contactObject.email === nextValue,
    );
    setContacts(nextContacts);
    setEmail(event.target.value);
  }

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
            {data &&
              data?.data
                .filter(contactObject => contactObject.email !== user?.email)
                .map(contactObject => (
                  <PreviousChat
                    contact={contactObject}
                    key={contactObject.email}
                    email={contactObject.email}
                    lastMessage={'Hello World'}
                  />
                ))}
          </ul>
        </article>
      </aside>
      <section className={styles.focus}>
        <div className={styles.wrapper}>
          {!contact && (
            <form className={styles.search}>
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
            </form>
          )}
          <section className={styles.display}>
            {!contact && (
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
                <div className={styles.list}>
                  {data &&
                    data?.data
                      .filter(
                        contactObject => contactObject.email !== user?.email,
                      )
                      .map(contactObject => (
                        <PreviousChat
                          contact={contactObject}
                          key={contactObject.email}
                          email={contactObject.email}
                          lastMessage={'Hello World'}
                        />
                      ))}
                </div>
              </article>
            )}
          </section>
          {contact && <ChatBox />}
        </div>
      </section>
    </main>
  );
}

export default Main;
