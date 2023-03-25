function userDateFormat() {
  if (window["gt-design"] == null) {
    window["gt-design"] = {};
  }

  // get's the user default format from the browser, like "yyyy/MM/dd" or "dd/MM/yyyy"
  const formatter = new Intl.DateTimeFormat();
  const parts = formatter.formatToParts(new Date());
  const datePattern = parts
    .map((part) => {
      switch (part.type) {
        case "day":
          return "dd";
        case "month":
          return "MM";
        case "year":
          return "yyyy";
        default:
          return part.value;
      }
    })
    .join("");

  window["gt-design"].userDateFormat = datePattern;
}

export default userDateFormat;
