import React from "react";

import GridImages from "../GridImages/GridImages";
import InstagramBlock from "../InstagramBlock/InstagramBlock";
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
          if (comp._modelApiKey === "instagram_block") {
            return <InstagramBlock key={index} data={comp} />;
          }
          return null;
        })}
      {pageItem && pageItem._modelApiKey === "article" && (
        <Article data={pageItem} />
      )}
    </>
  );
};
export default ComponentLoader;
