import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useState } from "react";
import Card from "../components/Card";
import styles from "../styles/Search.module.scss";
import isValidURL from "../utils/isValidUrl";
interface Link {
  href: string;
  title: string;
}

const Search: NextPage = () => {
  const [url, setUrl] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    fetch("api/getLinks", {
      method: "POST",
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((res) => {
        const { name, data } = res;
        setPlaylistName(name);
        setLinks(data);
      })
      .then(() => setIsLoading(false));
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
            disabled={!isValidURL(url) || isLoading}
            type="button"
            className={styles.searchButton}
            value="Search"
            onClick={handleClick}
          />
        </div>
        <div className={styles.hint}>
          example: https://www.youtube.com/c/UlbiTV/videos
        </div>
        {isLoading && <div className={styles.loader}></div>}
        {!isLoading && links.length > 0 && (
          <>
            <div className={styles.playlistName}>
              Playlist name: {playlistName}
            </div>
            <div>Found {links.length} items:</div>
            <div>
              {links.map((link) => (
                <Card key={link.title} title={link.title} href={link.href} />
              ))}
            </div>
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
