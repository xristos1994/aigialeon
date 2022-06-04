import React from 'react';
import { BlogPost } from '../../components/BlogPost/BlogPost';

export const BlogPostPreview = ({ entry, widgetFor }) => {
  const content = widgetFor('body');
  const description = entry.getIn(['data', 'description']);
  const tags = entry.getIn(['data', 'tags']);
  const displayTitle = entry.getIn(['data', 'displayTitle']);
  const publishDate = entry.getIn(['data', 'publishDate']);
  const mainImage = entry.getIn(['data', 'mainImage']) || {};
  const previewImage = entry.getIn(['data', 'previewImage']) || {};

  return (
    <BlogPost
      content={content}
      description={description}
      tags={tags && tags.toJS()}
      title={displayTitle}
      publishDate={publishDate}
      mainImage={mainImage}
      previewImage={previewImage}
    />
  );
};
