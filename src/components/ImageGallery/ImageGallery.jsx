import React from "react";
import { BluredContainer } from '../../common-components/BluredContainer/BluredContainer';
import * as styles from './ImageGallery.module.css';

export const ImageGallery = ({
  images,
  title
}) => {
  const [activeImage, setActiveImage] = React.useState(null);

  if(!images?.length) {
    return null;
  }

  return (
    <div className={styles.imageGallery}>
      {
        activeImage ? (
          <BluredContainer onDismiss={() => setActiveImage(null)}>
             <img
              src={activeImage?.publicURL}
              alt={activeImage.alt || ''}
              className={styles.activeImage}
            />
          </BluredContainer>
        ) : null
      }

      {
        title ? (
          <h3>{title}</h3>
        ) : null
      }

      <div className={styles.imagesContainer}>
        {
          images.map((image, index) => {
            console.log(image)
            return (
              image.fullImage?.name ? (
                <button
                  key={index}
                  label={(image.alt || '') + ' preview'}
                  onClick={() => setActiveImage({...(image.fullImage || image.preview), alt: image.alt || ''})}
                >
                   <img
                    src={image.preview?.publicURL || image.fullImage?.publicURL}
                    alt={(image.alt || '') + ' preview'}
                    className={styles.previewImage}
                  />
                </button>
              ) : null
            );
          })
        }
      </div>
    </div>
  );
};
