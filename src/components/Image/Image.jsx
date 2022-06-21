import * as React from "react";
import * as styles from './Image.module.css';

export const Image = ({ image }) => {
  if(!image?.name) {
    return null;
  }

  return (
    <img className={styles.image} src={image.publicURL} alt={image.alt}/>
  );
};