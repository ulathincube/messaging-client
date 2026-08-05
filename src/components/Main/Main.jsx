import styles from './Main.module.css';

function Main() {
  return (
    <main className={styles.main}>
      <aside className={styles.sidebar}></aside>
      <section className={styles.focus}></section>
    </main>
  );
}

export default Main;
