import { useContext } from 'react';
import ContactContext from '../store/contact';

function useContact() {
  return useContext(ContactContext);
}

export default useContact;
