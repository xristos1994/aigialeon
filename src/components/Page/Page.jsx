import React from "react";
import { DynamicComponent } from '../DynamicComponent/DynamicComponent';
import './Page.module.css';
import './variables.module.css';

const Page = (props) => {
  const components = props?.pageContext?.components || [];

  return (
    <div>
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