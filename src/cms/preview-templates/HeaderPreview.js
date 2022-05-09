import React from 'react';
import { Header } from '../../components/Header/Header';

export const HeaderPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();

  return <Header links={data.links} />;
};
