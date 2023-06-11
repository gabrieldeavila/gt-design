declare global {
  interface Window {
    ["gt-design"]: Record<string, unknown>;
  }
}

export * from "./utils";

export * from "./components";

export * from "./context";

export * from "./gt";
