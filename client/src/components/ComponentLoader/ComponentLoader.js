import React from "react";

import GridImages from "../GridImages/GridImages";

const ComponentLoader = (props) => {
  const content = props.data.content;
  return (
    <>
      {content.map((comp, index) => {
        if (comp.__typename === "ComponentLayoutGridImages") {
          return <GridImages key={index} data={comp} />;
        }
      })}
    </>
  );
};
export default ComponentLoader;
