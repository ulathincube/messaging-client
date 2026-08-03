import styles from './Header.module.css';
import { Link } from 'react-router';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Messaging</div>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link className={styles.link} to='/users'>
              New Chat
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} to='/profile'>
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
