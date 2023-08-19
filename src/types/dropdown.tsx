export type Option = {
  value: number;
  name: string;
};

export type DropdownProps = {
  selectedValue?: number;
  options: Option[];
  onSelectOption: (value: number) => void;
};
