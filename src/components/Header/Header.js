import * as React from "react";

export const Header = ({ links = [] }) => (
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
);