import styles from './Toast.module.css';
import useStatus from '../../hooks/useStatus';

function Toast() {
  const { status } = useStatus();

  if (!status) return;
  const { type, message } = status;

  if (type && message)
    return <div className={`${styles.toast} ${styles[type]}`}>{message}</div>;
  else return;
}

export default Toast;
