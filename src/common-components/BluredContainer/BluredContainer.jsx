import React from "react";
import * as styles from './BluredContainer.module.css';

export const BluredContainer = ({children, onDismiss}) => {
  React.useEffect(() => {
    const bodyElement = document.querySelector('body');

    bodyElement.style.overflowY = 'hidden';
    bodyElement.style.overflowX = 'hidden';

    return () => {
      bodyElement.style.overflowY = 'auto';
      bodyElement.style.overflowX = 'auto';
    }
  }, []);

  return (
    <div className={styles.bluredContainer}>
      <button className={styles.dismissButton} onClick={onDismiss}>
        X
      </button>
      {children}
    </div>
  );
};