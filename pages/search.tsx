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
  isSelected: boolean;
}

const Search: NextPage = () => {
  const [url, setUrl] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchClick = useCallback(() => {
    setIsLoading(true);

    fetch("api/getLinks", {
      method: "POST",
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((res) => {
        const { name, data } = res;
        setPlaylistName(name);
        setLinks(data.map((d) => ({ ...d, isSelected: false })));
      })
      .then(() => setIsLoading(false));
  }, [url]);

  const handleSelectAllClick = useCallback(() => {
    setLinks((prev) => prev.map((link) => ({ ...link, isSelected: true })));
  }, []);

  const handleSelectLink = useCallback((href) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.href === href ? { ...link, isSelected: !link.isSelected } : link
      )
    );
  }, []);

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
            disabled={!url || !isValidURL(url) || isLoading}
            type="button"
            className={styles.searchButton}
            value="Search"
            onClick={handleSearchClick}
          />
        </div>
        <div className={styles.hint}>
          example: https://www.youtube.com/c/UlbiTV/videos
        </div>

        {isLoading && <div className={styles.loader}></div>}

        {!isLoading && links.length > 0 && (
          <>
            <div className={styles.header}>
              <div>Playlist name: {playlistName}</div>
              <div>Found {links.length} items:</div>
              <input
                disabled={
                  !url ||
                  !isValidURL(url) ||
                  isLoading ||
                  links.every((link) => link.isSelected)
                }
                type="button"
                className={styles.selectButton}
                value={"SelectAll"}
                onClick={handleSelectAllClick}
              />
              <input
                disabled={links.every((link) => link.isSelected === false)}
                type="button"
                className={styles.selectButton}
                value={"Save Playlist"}
                // onClick={handleSelectAllClick}
              />
            </div>

            <div>
              {links.map((link) => (
                <Card key={link.href} link={link} onSelect={handleSelectLink} />
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
