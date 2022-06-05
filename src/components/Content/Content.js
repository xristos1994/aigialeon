import * as React from "react";
import PropTypes from "prop-types";

export const Content = ({ content, className }) => (
  typeof content === 'string' ? (
    <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
  ) : (
    <div className={className}>{content}</div>
  )
);

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
};
