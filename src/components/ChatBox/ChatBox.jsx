import styles from './ChatBox.module.css';
import useContact from '../../hooks/useContact';
import ChatMessage from '../ChatMessage/ChatMessage';
import { useState } from 'react';
import { createMessage } from '../../services/message';
import { findChats } from '../../services/user';
import { getProfileStatus } from '../../services/profile';
import useAuth from '../../hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useStatus from '../../hooks/useStatus';

function ChatBox() {
  const [contact] = useContact();
  const [message, setMessage] = useState('');
  const [user] = useAuth();
  const queryClient = useQueryClient();
  const { onChangeStatus } = useStatus();

  const { data, error, isLoading } = useQuery({
    queryKey: ['findChats'],
    queryFn: () => {
      if (isLoading) {
        onChangeStatus({ type: 'loading', message: '' });
      }
      if (error) {
        onChangeStatus({ type: 'error', message: error.message });
      }
      return findChats(user.email, contact.email);
    },
  });

  const mutation = useMutation({
    mutationFn: ({ message, senderEmail, contactEmail }) =>
      createMessage(message, senderEmail, contactEmail),
    onSuccess: data => {
      console.log({ data });
      queryClient.invalidateQueries({ queryKey: ['findChats'] });
    },
    onError: error => {
      console.error(error);
    },
  });

  const {
    data: _data,
    error: _error,
    isLoading: _isLoading,
  } = useQuery({
    queryKey: ['getProfileStatus', contact.email],
    queryFn: () => {
      if (_isLoading) {
        onChangeStatus({ type: 'loading', message: '' });
      }
      if (error) {
        onChangeStatus({ type: 'error', message: _error.message });
      }
      return getProfileStatus(contact.email);
    },
  });

  function onMessageChange({ target: { value } }) {
    setMessage(value);
  }

  async function onSendMessage(event) {
    event.preventDefault();

    mutation.mutate({
      message,
      senderEmail: user.email,
      contactEmail: contact.email,
    });

    // try {
    //   const response = await createMessage(message, user.email, contact.email);

    //   const { data, error, message: message_ } = await response.json();
    //   console.log({ data, error, message_ });
    //   setChats(currentChats => [...currentChats, data]);
    //   setMessage('');
    // } catch (error) {
    //   if (error) throw error;
    // }
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
          <span className={styles.status}>
            {(_data && _data?.data?.status) || 'Online'}
          </span>
        </div>
      </div>
      <article className={styles.chats}>
        {data &&
          data.data.map(chatObject => (
            <ChatMessage key={chatObject.message_id} chatMessage={chatObject} />
          ))}
      </article>
      <form className={styles.chat}>
        <div className={styles.group}>
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
