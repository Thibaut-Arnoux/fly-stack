import { Search as SearchIcon } from 'lucide-react';
import type { LabelHTMLAttributes } from 'react';

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <label className="input" {...props}>
      <SearchIcon />
      <input
        type="search"
        placeholder={label}
        value={search}
        onChange={handleChange}
      />
    </label>
  );
};
