import { useEffect, useState } from "react";
import { tesloApi } from "../../../api/tesloApi";

const RequestInfo = () => {
  const [info, setInfo] = useState<unknown>("");

  useEffect(() => {
    tesloApi
      .get("auth/private")
      .then((res) => setInfo(res))
      .catch((err) => setInfo(err));
  }, []);
  return (
    <div>
      <h2>Información usuario</h2>
      <pre>{JSON.stringify(info, null, 2)}</pre>
    </div>
  );
};

export default RequestInfo;
