import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router';
import Profile from '../Profile';
import useContact from '../../hooks/useContact';
import Logo from '../Logo';

function Header() {
  const [contact, onChangeContact] = useContact();
  const navigate = useNavigate();
  function onClickReset() {
    onChangeContact(null);
    navigate('/');
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <button onClick={onClickReset} className={styles.reset}>
          <Logo size='large' />
        </button>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link className={styles.link} to='/profile'>
              <Profile />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
