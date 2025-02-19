import React from "react";

import GridImages from "../GridImages/GridImages";
import InstagramBlock from "../InstagramBlock/InstagramBlock";
import Article from "../Article/Article";
import Page from "../Page/Page";

const ComponentLoader = (props) => {
  const content = props.content ? props.content : null;
  const articleItem = props.article ? props.article[0].attributes : null;
  const pageItem = props.page ? props.page.attributes : null;
  return (
    <>
      {content &&
        content.map((comp, index) => {
          if (comp.__component === "page-components.grid-images") {
            return <GridImages key={index} data={comp} />;
          }
          if (comp._modelApiKey === "instagram_block") {
            return <InstagramBlock key={index} data={comp} />;
          }
          return null;
        })}
      {articleItem && <Article data={articleItem} />}
      {pageItem && <Page data={pageItem} />}
    </>
  );
};
export default ComponentLoader;
