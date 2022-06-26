import React from "react";
import { Content } from "../Content/Content";
import { Description } from '../Description/Description';
import { Image } from '../Image/Image';
import { Title } from '../Title/Title';
import * as styles from './BlogPost.module.css';

export const BlogPost = ({
  content,
  description,
  title,
  publishDate,
  mainImage
}) => {

  return (
    <section>
      <Title title={title}/>
      <Description description={description}/>
      <Image image={mainImage}/>

      {
        publishDate ? (
          <p className={styles.publishDate}>{publishDate.toString()}</p>
        ) : null
      }

      <Content content={content} />
    </section>
  );
};
