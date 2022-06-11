import * as React from "react";
import * as styles from './Description.module.css';

export const Description = ({ description }) => {
  if(!description) {
    return null;
  }

  return (
    <p className={styles.description}>{description}</p>
  );
};