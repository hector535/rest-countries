export type Option = {
  value: string;
  name: string;
};

export type DropdownProps = {
  selectedValue?: string;
  options: Option[];
  className?: string;
  onSelectOption: (value: string) => void;
};
