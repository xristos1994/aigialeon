import React from "react";
import { Content } from "../Content/Content";

export const BlogPost = ({
  content,
  description,
  tags,
  title,
  publishDate,
  mainImage,
  previewImage
}) => {

  return (
    <section className="section">
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>

            {
              mainImage.name ? (
                <p>mainImage: {mainImage.name} with alt: {mainImage.alt}</p>
              ) : null
            }

            {
              previewImage.name ? (
                <p>previewImageName: {previewImage.name} with alt: {previewImage.alt}</p>
              ) : null
            }

            {
              publishDate ? (
                <p>{publishDate.toString()}</p>
              ) : null
            }

            <Content content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
