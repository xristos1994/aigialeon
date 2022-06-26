import React from "react";
import { DynamicComponent } from '../DynamicComponent/DynamicComponent';
import './normalize.module.css';
import './variables.module.css';
import * as styles from './Page.module.css';

const Page = (props) => {
  const components = props?.pageContext?.components || [];

  return (
    <div className={styles.pageContainer}>
      {
        components.map((component, index) => {
          return (
            <DynamicComponent key={index} {...component}/>
          );
        })
      }
    </div>
  );
};

export default Page