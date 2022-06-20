import * as React from "react";
import * as styles from './BlogPostPreview.module.css';

export const BlogPostPreview = ({ title, description, previewImage, url }) => {
  if(!url ) {
    return null;
  }

  console.log(previewImage);

  return (
    <div className={styles.blogPostPreview}>
      {title} - {description} - {url}
    </div>
  );
};