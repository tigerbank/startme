import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import FeedbackForm from './components/FeedbackForm';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <FeedbackForm />
    </div>
  );
};

export default Home;
