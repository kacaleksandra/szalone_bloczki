export type Block = {
  id: number;
  name: string;
  getContent: (
    itemKey: Number,
    inputValues: any[],
    changeValue: (itemKey: number, inputKey: number, inputValue: any) => void
  ) => JSX.Element;
  hasInside?: boolean;
  inside: Block[];
  key: number;
  inputAmount?: number;
};
