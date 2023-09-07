import React from "react";

import GridImages from "../GridImages/GridImages";
import InstagramBlock from "../InstagramBlock/InstagramBlock";
import Article from "../Article/Article";
import Page from "../Page/Page";

const ComponentLoader = (props) => {
  const content = props.data.content;
  const articleItem = props.data.articleItem;
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
      {articleItem && articleItem._modelApiKey === "article" && (
        <Article data={articleItem} />
      )}
      {pageItem && pageItem._modelApiKey === "page" && <Page data={pageItem} />}
    </>
  );
};
export default ComponentLoader;
