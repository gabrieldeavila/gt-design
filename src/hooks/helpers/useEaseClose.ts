import { useEffect, useState } from "react";
import useIsFirstRender from "./useIsFirstRender";

function useEaseClose(open: boolean) {
  const firstRender = useIsFirstRender();
  const [easeClose, setEaseClose] = useState(false);

  useEffect(() => {
    if (firstRender) return;

    if (!open) {
      setTimeout(() => {
        setEaseClose(false);
      }, 200);
    } else {
      setEaseClose(true);
    }
  }, [firstRender, open]);

  return easeClose;
}

export default useEaseClose;
