import * as React from "react";
import * as styles from './Title.module.css';

export const Title = ({ title }) => {
  if(!title) {
    return null;
  }

  return (
    <h1 className={styles.title}>{title}</h1>
  );
};