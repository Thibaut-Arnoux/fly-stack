import { Search as SearchIcon } from 'lucide-react';
import { type LabelHTMLAttributes, useId } from 'react';
import { Input } from '@/components/ui/inputs/input';

type SearchProps = {
  placeholder?: string;
  search: string;
  onSearchChange: (value: string) => void;
} & LabelHTMLAttributes<HTMLLabelElement>;

export const SearchBar = ({
  placeholder = 'Search',
  search,
  onSearchChange,
  className,
  ...props
}: SearchProps) => {
  const id = useId();

  return (
    <label htmlFor={id} className={`input ${className}`} {...props}>
      <SearchIcon />
      <Input
        id={id}
        type="search"
        placeholder={placeholder}
        defaultValue={search}
        onChange={(e) => onSearchChange(e.target.value)}
        delay={500}
      />
    </label>
  );
};
