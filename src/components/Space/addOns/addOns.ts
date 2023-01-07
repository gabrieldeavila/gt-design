import { IAddOns } from "../interface";

const centerColumn = "align-items: center;";

const centerRow = "justify-content: center;";

const middleRow = "align-items: center;";

const middleColumn = "justify-content: center;";

const fullSpace =
  "width: -webkit-fill-available; height: -webkit-fill-available;";

const addOnsOptions: IAddOns = {
  centerColumn,
  centerRow,
  middleRow,
  middleColumn,

  "full-space": fullSpace,

  "pd-1": "padding: 1rem;",
  "pd-2": "padding: 2rem;",
  "pd-3": "padding: 3rem;",
  "pd-4": "padding: 4rem;",
  "pd-5": "padding: 5rem;",

  "pt-1": "padding-top: 1rem;",
  "pt-2": "padding-top: 2rem;",
  "pt-3": "padding-top: 3rem;",
  "pt-4": "padding-top: 4rem;",
  "pt-5": "padding-top: 5rem;",

  "pb-1": "padding-bottom: 1rem;",
  "pb-2": "padding-bottom: 2rem;",
  "pb-3": "padding-bottom: 3rem;",
  "pb-4": "padding-bottom: 4rem;",
  "pb-5": "padding-bottom: 5rem;",

  "pl-1": "padding-left: 1rem;",
  "pl-2": "padding-left: 2rem;",
  "pl-3": "padding-left: 3rem;",
  "pl-4": "padding-left: 4rem;",
  "pl-5": "padding-left: 5rem;",

  "pr-1": "padding-right: 1rem;",
  "pr-2": "padding-right: 2rem;",
  "pr-3": "padding-right: 3rem;",
  "pr-4": "padding-right: 4rem;",
  "pr-5": "padding-right: 5rem;",

  "mt-1": "margin-top: 1rem;",
  "mt-2": "margin-top: 2rem;",
  "mt-3": "margin-top: 3rem;",
  "mt-4": "margin-top: 4rem;",
  "mt-5": "margin-top: 5rem;",

  "mb-1": "margin-bottom: 1rem;",
  "mb-2": "margin-bottom: 2rem;",
  "mb-3": "margin-bottom: 3rem;",
  "mb-4": "margin-bottom: 4rem;",
  "mb-5": "margin-bottom: 5rem;",

  "ml-1": "margin-left: 1rem;",
  "ml-2": "margin-left: 2rem;",
  "ml-3": "margin-left: 3rem;",
  "ml-4": "margin-left: 4rem;",
  "ml-5": "margin-left: 5rem;",

  "mr-1": "margin-right: 1rem;",
  "mr-2": "margin-right: 2rem;",
  "mr-3": "margin-right: 3rem;",
  "mr-4": "margin-right: 4rem;",
  "mr-5": "margin-right: 5rem;",

  "mg-1": "margin: 1rem;",
  "mg-2": "margin: 2rem;",
  "mg-3": "margin: 3rem;",
  "mg-4": "margin: 4rem;",
  "mg-5": "margin: 5rem;",

  "w-10": "width: 10%;",
  "w-20": "width: 20%;",
  "w-30": "width: 30%;",
  "w-40": "width: 40%;",
  "w-50": "width: 50%;",
  "w-60": "width: 60%;",
  "w-70": "width: 70%;",
  "w-80": "width: 80%;",
  "w-90": "width: 90%;",
  "w-100": "width: 100%;",

  "gap-xs": "gap: 0.25rem;",
  "gap-sm": "gap: 0.5rem;",
  "gap-1": "gap: 1rem;",
  "gap-2": "gap: 2rem;",
  "gap-3": "gap: 3rem;",
  "gap-4": "gap: 4rem;",
  "gap-5": "gap: 5rem;",

  "mobile-grow": "@media (max-width: 800px) { flex-grow: 1; }",
  "mobile-100": "@media (max-width: 800px) { width: 100%; }",
  "flex-wrap": "flex-wrap: wrap;",
  "flex-grow": "flex-grow: 1;",
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
