import React, { useContext, useEffect, useState } from "react";
import { DatoContext } from "../../hooks/datoCMS";

import Page from "../../components/Page/Page";

import "./TrainingScheme.scss";

const TrainingScheme = () => {
  const [data, setData] = useState(null);
  const context = useContext(DatoContext);

  useEffect(() => {
    if (context) {
      setData(context.trainingSchemePage);
    }
  }, [context]);
  useEffect(() => {}, [data]);
  return (
    <>
      <Page data={data} dualContent />
    </>
  );
};
export default TrainingScheme;
