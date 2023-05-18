import React from "react";

import GridImages from "../GridImages/GridImages";

const ComponentLoader = (props) => {
  const content = props.data.content;
  return (
    <>
      {content.map((comp, index) => {
        if (comp._modelApiKey === "image_grid") {
          return <GridImages key={index} data={comp} />;
        }
      })}
    </>
  );
};
export default ComponentLoader;
