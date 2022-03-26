import isValidURL from "../utils/isValidUrl";
import styles from "../styles/SearchInput.module.scss";
import { ChangeEvent, FC } from "react";

interface SearchInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  onSearchClick: () => void;
}

const SearchInput: FC<SearchInputProps> = ({
  onChange,
  isDisabled,
  onSearchClick,
}) => {
  return (
    <>
      <div className={styles.search}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="YT channel name"
          onChange={onChange}
        ></input>
        <input
          disabled={isDisabled}
          type="button"
          className={styles.searchButton}
          value="Search"
          onClick={onSearchClick}
        />
      </div>
      <div className={styles.hint}>
        example: https://www.youtube.com/c/UlbiTV/videos
      </div>
    </>
  );
};

export default SearchInput;
