import styles from './Profile.module.css';
import useAuth from '../../hooks/useAuth';

function Profile() {
  const [user] = useAuth();
  if (!user) return;

  const letter = user.email.charAt(0).toUpperCase();

  return (
    <section className={styles.wrapper}>
      <div className={styles.avatar}>
        <span className={styles.letter}>{letter}</span>
      </div>
      <p className={styles.user}>{user.email}</p>
    </section>
  );
}

export default Profile;
