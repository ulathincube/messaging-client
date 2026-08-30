import { useContext } from 'react';
import SocketContext from '../store/socket';

function useSocket() {
  return useContext(SocketContext);
}

export default useSocket;
