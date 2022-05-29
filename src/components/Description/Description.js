import * as React from "react";

export const Description = ({ description }) => {
  if(!description) {
    return null;
  }

  return (
    <p>{description}</p>
  );
};