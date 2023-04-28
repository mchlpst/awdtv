import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { HomePageQuery } from "../../queries";
import ComponentLoader from "../../components/ComponentLoader/ComponentLoader";

const HomePage = () => {
  const [content, setContent] = useState(null);

  const { loading, error, data } = useQuery(HomePageQuery);

  useEffect(() => {
    if (!loading && !error) {
      console.log(data);
      setContent(data.homePage.data.attributes);
    }
  }, [loading]);

  return <main>{content && <ComponentLoader data={content} />}</main>;
};
export default HomePage;
