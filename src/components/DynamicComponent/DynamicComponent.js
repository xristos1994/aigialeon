import React from "react";
import { Header } from "../Header/Header";
import { Description } from '../Description/Description';
import { Image } from '../Image/Image';
import { Title } from '../Title/Title';
import { BlogPost } from '../BlogPost/BlogPost';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { BlogPostsList } from '../BlogPostsList/BlogPostsList';
import { BlogPostPreview } from '../BlogPostPreview/BlogPostPreview';

const Components = {
  Header,
  Description,
  Image,
  Title,
  BlogPost,
  ImageGallery,
  BlogPostsList,
  BlogPostPreview
}

export const DynamicComponent = ({ component, props = {} }) => {
  React.useEffect(() => {
    if (typeof Components[component] === 'undefined') {
      console.error(`Failed to render component ${component}`);
    }
  }, [component]);

  if (typeof Components[component] !== 'undefined') {
    const Component = Components[component]
    return (
      <Component {...props}/>
    );
  }
  return null
};