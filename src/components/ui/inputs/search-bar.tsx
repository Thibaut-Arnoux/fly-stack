import { Search as SearchIcon } from 'lucide-react';
import { type LabelHTMLAttributes, useId, useRef, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import { Input } from '@/components/ui/inputs/input';
import { cn } from '@/utils/cn';

type SearchProps = {
  placeholder?: string;
  search: string;
  onSearchChange: (value: string) => void;
  delay?: number;
} & LabelHTMLAttributes<HTMLLabelElement>;

export const SearchBar = ({
  placeholder = 'Search',
  search,
  onSearchChange,
  delay = 500,
  className,
  ...props
}: SearchProps) => {
  const id = useId();
  const [localSearch, setLocalSearch] = useState(search);
  const prevSearchRef = useRef(search);
  const debouncedOnSearchChange = useDebounceCallback(onSearchChange, delay);

  if (prevSearchRef.current !== search && search === '' && localSearch !== '') {
    setLocalSearch('');
  }
  prevSearchRef.current = search;

  return (
    <label htmlFor={id} className={cn('input', className)} {...props}>
      <SearchIcon />
      <Input
        id={id}
        type="search"
        placeholder={placeholder}
        value={localSearch}
        onChange={(e) => {
          setLocalSearch(e.target.value);
          debouncedOnSearchChange(e.target.value);
        }}
      />
    </label>
  );
};
