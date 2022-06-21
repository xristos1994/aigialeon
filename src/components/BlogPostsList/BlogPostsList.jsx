import * as React from "react";
import { BlogPostPreview } from '../BlogPostPreview/BlogPostPreview';
import * as styles from './BlogPostsList.module.css';

export const BlogPostsList = ({ blogPosts }) => {
  if(!blogPosts || !blogPosts.length ) {
    return null;
  }

  return (
    <div className={styles.blogPostsList}>
      {
        blogPosts.map((blog, index) => (
          <BlogPostPreview
            key={index}
            title={blog.title}
            description={blog.description}
            previewImage={blog.previewImage}
            url={blog.url}
          />
        ))
      }
    </div>
  );
};