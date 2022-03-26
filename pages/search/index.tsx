import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useState } from "react";
import LinkCard from "../../components/Link";
import SearchInput from "../../components/SearchInput";
import styles from "../../styles/Search.module.scss";
import isValidURL from "../../utils/isValidUrl";

interface ResponseData {
  href: string;
  title: string;
}
interface Link extends ResponseData {
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
        setLinks(
          data.map((lnk: ResponseData) => ({ ...lnk, isSelected: false }))
        );
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

  const handleSaveClick = useCallback(() => {}, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>YT viewer</title>
      </Head>

      <main className={styles.main}>
        <SearchInput
          onChange={(e) => setUrl(e.target.value)}
          isDisabled={!url || !isValidURL(url) || isLoading}
          onSearchClick={handleSearchClick}
        />

        {isLoading && <div className={styles.loader} />}

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
            </div>

            <div>
              {links.map((link) => (
                <LinkCard
                  key={link.href}
                  link={link}
                  onSelect={handleSelectLink}
                />
              ))}
            </div>
          </>
        )}
        <p>
          <Link href="/">⬅ Return to my playlists</Link>
        </p>
        <div className={styles.footer}>
          {links.filter((link) => link.isSelected).length > 0 && (
            <input
              type="button"
              className={styles.saveButton}
              value={`Save playlist with ${
                links.filter((link) => link.isSelected).length
              } items`}
              onClick={handleSaveClick}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
