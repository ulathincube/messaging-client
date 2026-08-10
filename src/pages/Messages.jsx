import Header from '../components/Header';
import Main from '../components/Main';
import { findUser } from '../services/user';
import { useParams } from 'react-router';
import { useState } from 'react';

function Messages() {
  const { email } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getMessages() {
      try {
        const response = await findUser(email);
        if (!response) throw new Error('Unable to complete request');
        const { data, error, message } = await response.json();
        const allMessages = data.sentMessages.concat(data.receivedMessages);
        // allMessages.sort((a, b) => )
      } catch (error) {
        if (error) throw error;
      }
    }
  }, []);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default Messages;
