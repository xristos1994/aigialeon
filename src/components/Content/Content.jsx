import * as React from "react";
import PropTypes from "prop-types";
import { classnames } from './../../utils/classnames';

export const Content = ({ content, className }) => (
  typeof content === 'string' ? (
    <div className={classnames({[className]: className})} dangerouslySetInnerHTML={{ __html: content }} />
  ) : (
    <div className={classnames({[className]: className})}>{content}</div>
  )
);

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
};
