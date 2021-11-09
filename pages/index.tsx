import type { NextPage } from 'next';
import styles from 'styles/Home.module.css';
import FeedbackForm from 'components/FeedbackForm';
import Newsletter from 'components/Newsletter';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <FeedbackForm />
      <Newsletter />
    </div>
  );
};

export default Home;
