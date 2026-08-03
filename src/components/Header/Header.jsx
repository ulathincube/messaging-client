import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Messaging</div>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>New Chat</li>
          <li className={styles.item}>Profile</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
