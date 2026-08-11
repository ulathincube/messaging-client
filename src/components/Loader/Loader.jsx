import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.loader}>... Loading ...</span>
    </div>
  );
}

export default Loader;
