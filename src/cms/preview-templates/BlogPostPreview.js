import React from 'react';
import { BlogPost } from '../../components/BlogPost/BlogPost';

export const BlogPostPreview = ({ entry, widgetFor }) => {
  const content = widgetFor('body');
  const description = entry.getIn(['data', 'description']);
  const tags = entry.getIn(['data', 'tags']);
  const displayTitle = entry.getIn(['data', 'displayTitle']);
  const publishDate = entry.getIn(['data', 'publishDate']);
  const mainImageName = entry.getIn(['data', 'mainImage']);
  const mainImageAlt = entry.getIn(['data', 'mainImageAlt']);
  const previewImageName = entry.getIn(['data', 'previewImage']);
  const previewImageAlt = entry.getIn(['data', 'previewImageAlt']);
  console.log(publishDate)

  return (
    <BlogPost
      content={content}
      description={description}
      tags={tags && tags.toJS()}
      title={displayTitle}
      publishDate={publishDate}
      mainImageName={mainImageName}
      mainImageAlt={mainImageAlt}
      previewImageName={previewImageName}
      previewImageAlt={previewImageAlt}
    />
  );
};
