import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const isEmpty = true;
  return (
    <div className={styles.container}>
      <Head>
        <title>YT viewer</title>
      </Head>

      <main className={styles.main}>
        {isEmpty ? (
          <>
            <h1 className={styles.title}>Welcome to YT viewer</h1>
            <p>
              You have 0 playlists. Go{" "}
              <Link href="/search">
                <a className={styles.link}>search</a>
              </Link>
            </p>
          </>
        ) : (
          <>
            <h1 className={styles.title}>My playlists</h1>
            <div className={styles.grid}></div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
