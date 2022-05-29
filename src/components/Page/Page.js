import React from "react";
import { DynamicComponent } from '../DynamicComponent/DynamicComponent';

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