import { useContext } from 'react';
import StatusContext from '../store/status';

function useStatus() {
  const statusValue = useContext(StatusContext);
  return statusValue;
}

export default useStatus;
