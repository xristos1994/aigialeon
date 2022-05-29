import * as React from "react";
import { Description } from '../Description/Description';
import { Image } from '../Image/Image';
import { Title } from '../Title/Title';

export const Header = ({ links = [], title, description, imageName, imageAlt }) => {
  return (
    <>
      {
        links.length ? (
          <div>
            {
              links.map((link, index) => {
                return (
                  <div key={index}>
                    <a href={link.url}>
                      {link.label}
                    </a>
                  </div>
                );
              })
            }
          </div>
        ) : null
      }

      <Title title={title} />
      <Description description={description} />
      <Image imageName={imageName} imageAlt={imageAlt} />
    </>
  );
};