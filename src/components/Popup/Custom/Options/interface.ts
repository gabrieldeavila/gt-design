export interface IOptionsItems {
  name: string;
  value: string | number;
  onClick?: (value: string | number) => void;
}

export interface IOptions {
  items: IOptionsItems[];
  parentRef: React.RefObject<HTMLDivElement | HTMLButtonElement>;
}
