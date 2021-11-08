import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
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
