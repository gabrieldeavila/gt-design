import { useMemo } from "react";
import userDateFormat from "../../utils/userDateFormat";

// adds the user date format to the window object, so it can be accessed in any component
userDateFormat();

function useDateFormat() {
  const userDefaultFormat = useMemo(() => {
    if (typeof window === "undefined") return;

    return window?.["gt-design"]?.userDateFormat?.toString() ?? "MM/dd/yyyy";
  }, []);

  return userDefaultFormat;
}

export default useDateFormat;
