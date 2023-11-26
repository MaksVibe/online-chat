import styles from './page.module.scss';
import SignForm from './SignForm/SignForm';

export default function HomePage() {
  return (
    <main>
      <div className={styles.loginContainer}>
        <SignForm />
      </div>
    </main>
  );
}
