import styles from './Logo.module.css';

function Logo({ size = 'superlarge' }) {
  const sizing = styles[size];

  return (
    <div className={styles.wrapper}>
      <span className={`${styles.logo} ${sizing}`}>Message-Me</span>
    </div>
  );
}

export default Logo;
