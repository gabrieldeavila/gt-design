import { IAddOns } from "../interface";

const centerColumn = "align-items: center;";

const centerRow = "justify-content: center;";

const middleRow = "align-items: center;";

const middleColumn = "justify-content: center;";

const fullSpace = "width: -webkit-fill-available; height: -webkit-fill-available;";

const addOnsOptions: IAddOns = {
  centerColumn,
  centerRow,
  middleRow,
  middleColumn,

  "full-space": fullSpace,
};

const addOnsCss = (addOns?: string[], type?: "row" | "column") => {
  type = type ?? "column";

  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  let addOnsCss = "";

  for (const addOn of addOns ?? []) {
    const currAddOn = addOn + capitalizedType;
    const currOption = addOnsOptions[currAddOn] ?? addOnsOptions[addOn];

    if (currOption != null) {
      addOnsCss += currOption + " \n";
    }
  }

  return addOnsCss;
};

export default addOnsCss;
