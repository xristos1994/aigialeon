import * as React from "react";

export const Image = ({ imageName, imageAlt }) => {
  if(!imageName) {
    return null;
  }

  return (
    <h2>Image: {imageName} and ImageAlt: {imageAlt} </h2>
  );
};