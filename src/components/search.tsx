import { Search as SearchIcon } from 'lucide-react';
import { type LabelHTMLAttributes, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

type SearchProps = {
  label?: string;
  search: string;
  onSearchChange: (value: string) => void;
} & LabelHTMLAttributes<HTMLLabelElement>;

export const Search = ({
  label = 'Search',
  search,
  onSearchChange,
  ...props
}: SearchProps) => {
  const [value, setValue] = useState(search);
  const debounced = useDebounceCallback(onSearchChange, 500);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounced(e.target.value);
  };

  return (
    <label className="input" {...props}>
      <SearchIcon />
      <input
        type="search"
        placeholder={label}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};
