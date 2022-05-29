import React from 'react';
import { Header } from '../../components/Header/Header';

export const HeaderPreview = (props) => {
  const data = props.entry.getIn(['data']).toJS();

  const linkSlugs = data.pageCategory;

  const links = linkSlugs.map((link, index) => {
    return {
      label: `Link ${index + 1}`,
      url: link
    };
  });

  return (
    <>
      <Header links={links} />

      <br /><br /><br />

      <div style={{color: 'red'}}><strong>Note: </strong> In actual Site, each link will be the same as the selected page category </div>
    </>
  );
};
