import * as React from "react";

export const Title = ({ title }) => {
  if(!title) {
    return null;
  }

  return (
    <h1>{title}</h1>
  );
};