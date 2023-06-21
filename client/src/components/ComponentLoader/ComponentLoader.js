import React from "react";

import GridImages from "../GridImages/GridImages";
import Article from "../Article/Article";

const ComponentLoader = (props) => {
  const content = props.data.content;
  const pageItem = props.data.pageItem;

  return (
    <>
      {content &&
        content.map((comp, index) => {
          if (comp._modelApiKey === "image_grid") {
            return <GridImages key={index} data={comp} />;
          }
          // if (comp._modelApiKey === "article") {
          //   return <Article key={index} data={comp} />;
          // }
        })}
      {pageItem && pageItem._modelApiKey === "article" && (
        <Article data={pageItem} />
      )}
    </>
  );
};
export default ComponentLoader;
