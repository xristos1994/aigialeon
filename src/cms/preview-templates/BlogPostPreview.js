import React from 'react';
import { BlogPost } from '../../components/BlogPost/BlogPost';

export const BlogPostPreview = ({ entry, widgetFor }) => {
  const content = widgetFor('body');
  const description = entry.getIn(['data', 'description']);
  const tags = entry.getIn(['data', 'tags']);
  const displayTitle = entry.getIn(['data', 'displayTitle']);
  const publishDate = entry.getIn(['data', 'publishDate']);
  const mainImageAlt = entry.getIn(['data', 'mainImageAlt']);
  const previewImageAlt = entry.getIn(['data', 'previewImageAlt']);
  const mainImage = {...(entry.getIn(['data', 'mainImage']) || {}), alt: mainImageAlt};
  const previewImage = {...(entry.getIn(['data', 'previewImage']) || {}), alt: previewImageAlt};

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
