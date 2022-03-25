import { FC, useCallback } from "react";
import styles from "../styles/Card.module.scss";

interface Link {
  href: string;
  title: string;
  isSelected: boolean;
}
interface CardProps {
  onSelect: (id: string) => void;
  link: Link;
}

const Card: FC<CardProps> = ({ link, onSelect }) => {
  const { title, href, isSelected } = link;
  const handleClick = useCallback(() => onSelect(href), [href, onSelect]);

  return (
    <div
      className={isSelected ? styles.selected : styles.container}
      onClick={handleClick}
    >
      <div>{title}</div>
      <a
        className={styles.link}
        href={`https://www.youtube.com${href}`}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        youtube.com{href}
      </a>
    </div>
  );
};

export default Card;
