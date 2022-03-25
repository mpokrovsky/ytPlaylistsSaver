import Link from "next/link";
import { FC } from "react";
import styles from "../styles/Card.module.scss";

interface CardProps {
  title: string;
  href: string;
}

const Card: FC<CardProps> = ({ href, title }) => {
  return (
    <div className={styles.container}>
      <div>{title}</div>
      <a
        className={styles.link}
        href={`https://www.youtube.com${href}`}
        target="_blank"
        rel="noreferrer"
      >
        youtube.com{href}
      </a>
    </div>
  );
};

export default Card;
