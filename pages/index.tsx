import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Table from '../components/Table'
import TopBar from '../components/TopBar'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Adres FE Challenge</title>
        <meta name="Adres FE Challenge" content="Adres FE Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <TopBar heading="Adres Front-end Assignment" />
        <Table />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://subhampanja-28.web.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed by{' '}
          subham
        </a>
      </footer>
    </div>
  )
}

export default Home
