import * as React from "react";
import { Description } from '../Description/Description';
import { Image } from '../Image/Image';
import { Title } from '../Title/Title';
import { classnames } from '../../utils/classnames';
import * as styles from './Header.module.css';

// TODO:  While building the page maybe I could pass an extra property called pageUrl in order to do checks, or maybe another property called selected url. I need this in order to add class styles.selected to the selected category

export const Header = ({ links = [], title, description, mainImage }) => {
  const [isMenuExpanded, setIsMenuExpanded] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuExpanded(isMenuExpanded => !isMenuExpanded);
  }

  return (
    <>
      {
        links.length ? (
          <div
            className={classnames(styles.header, {
              [styles.withExpandedMenu]: isMenuExpanded
            })}
          >
            <button
              className={styles.toggleMenuBtn}
              onClick={toggleMenu}
            >
              E
            </button>
            {
              links.map((link, index) => {
                return (
                  <a key={index} href={link.url} className={styles.headerLink}>
                    {link.label}
                  </a>
                );
              })
            }
          </div>
        ) : null
      }

      <Title title={title} />
      <Description description={description} />
      <Image image={mainImage} />
    </>
  );
};