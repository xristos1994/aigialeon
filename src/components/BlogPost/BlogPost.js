import React from "react";
import { Content } from "../Content/Content";

export const BlogPost = ({
  content,
  description,
  tags,
  title,
  publishDate,
  mainImageName,
  mainImageAlt,
  previewImageName,
  previewImageAlt
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
              mainImageName ? (
                <p>mainImage: {mainImageName} with alt: {mainImageAlt}</p>
              ) : null
            }

            {
              previewImageName ? (
                <p>previewImageName: {previewImageName} with alt: {previewImageAlt}</p>
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
