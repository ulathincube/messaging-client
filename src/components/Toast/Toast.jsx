import styles from './Toast.module.css';
import useStatus from '../../hooks/useStatus';

function Toast() {
  const { status, message } = useStatus();

  if (!message) return;
  return <div className={`${styles.toast} ${styles[status]}`}>{message}</div>;
}

export default Toast;
