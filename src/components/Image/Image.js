import * as React from "react";

export const Image = ({ image }) => {
  if(!image?.name) {
    return null;
  }

  return (
    <h2>Image: {image.name} and ImageAlt: {image.alt} </h2>
  );
};