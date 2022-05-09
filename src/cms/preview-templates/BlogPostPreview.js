import React from 'react';
import { BlogPost } from '../../components/BlogPost/BlogPost';

export const BlogPostPreview = ({ entry, widgetFor }) => {
  const content = widgetFor('body');
  const description = entry.getIn(['data', 'description']);
  const tags = entry.getIn(['data', 'tags']);
  const title = entry.getIn(['data', 'title']);

  return (
    <BlogPost
      content={content}
      description={description}
      tags={tags && tags.toJS()}
      title={title}
    />
  );
};
