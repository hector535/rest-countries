export type Option = {
  value: number;
  name: string;
};

export type DropdownProps = {
  selectedValue?: number;
  options: Option[];
  className?: string;
  onSelectOption: (value: number) => void;
};
