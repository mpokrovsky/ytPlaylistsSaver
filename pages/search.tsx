import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useState } from "react";
import styles from "../styles/Search.module.scss";

interface Link {
  url: string;
  title: string;
}

const Search: NextPage = () => {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);
    fetch("api/hello", {
      method: "POST",
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((res) => setLinks(res));

    setIsLoading(false);
  }, [url]);

  return (
    <div className={styles.container}>
      <Head>
        <title>YT viewer</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.search}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="YT channel name"
            onChange={(e) => setUrl(e.target.value)}
          ></input>
          <input
            disabled={!url || isLoading}
            type="button"
            className={styles.searchButton}
            value="Search"
            onClick={handleClick}
          />
        </div>
        <div className={styles.hint}>
          example: youtube.com/channel/UCY03gpyR
        </div>
        {isLoading && <div className={styles.loader}></div>}
        {links.length > 0 && (
          <>
            {links.map((link) => (
              <div key={link.title}>{link.title}</div>
            ))}
          </>
        )}
        <p>
          <Link href="/">⬅ Return to my playlists</Link>
        </p>
      </main>
    </div>
  );
};

export default Search;
