import React from 'react';
import { ImageGallery } from '../../components/ImageGallery/ImageGallery';

export const ImageGalleryPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();
  const displayTitle = data?.displayTitle;
  const images = data?.imageList?.map(({image}) => ({ ...image, fullImage: { name: image.fullImage }, previewImage: { name: image.previewImage || image.fullImage } })).filter(image => image);

  return (
    <ImageGallery
      title={displayTitle}
      images={images}
    />
  );
};
