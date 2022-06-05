import React from "react";

export const ImageGallery = ({
  images,
  title
}) => {
  if(!images?.length) {
    return null;
  }

  return (
    <div>
      {
        title ? (
          <h3>{title}</h3>
        ) : null
      }

      {
        images.map((image, index) => {
          return (
            image.fullImage?.name ? (
              <div key={index}>
                Full Image: {image.fullImage?.name} -
                Preview Image: { image.preview?.name || image.fullImage?.name } -
                Alt: {image.alt}
              </div>
            ) : null
          );
        })
      }
    </div>
  );
};
