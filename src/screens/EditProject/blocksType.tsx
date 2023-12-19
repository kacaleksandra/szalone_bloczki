export type Block = {
  id: number;
  name: string;
  getContent: () => JSX.Element;
  variableName?: string;
  variableValue?: string;
  hasInside?: boolean;
  inside: Block[];
  key: number;
};
