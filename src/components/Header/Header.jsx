import * as React from "react";
import { Description } from '../Description/Description';
import { Image } from '../Image/Image';
import { Title } from '../Title/Title';
import { classnames } from '../../utils/classnames';
import * as styles from './Header.module.css';

export const Header = ({ links = [], title, description, mainImage }) => {
  const [isMenuExpanded, setIsMenuExpanded] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuExpanded(isMenuExpanded => !isMenuExpanded);
  }

  let pathname = '';

  if (typeof window !== undefined) {
    pathname = window.location.pathname;
  }

  const firstPartOfPathname = '/' + pathname.split('/')[1];

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
                  <a key={index} href={link.url} className={classnames(styles.headerLink, {[styles.selected]: firstPartOfPathname === link.url})}>
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