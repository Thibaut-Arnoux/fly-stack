import { createFileRoute } from '@tanstack/react-router';
import { ArrowBigDown } from 'lucide-react';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { Dropdown } from '@/components/ui/dropdowns/dropdown';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>

      <Dropdown>
        <Dropdown.Trigger>
          <IconButton icon={<ArrowBigDown />} />
        </Dropdown.Trigger>
        <Dropdown.Content>
          <ul className="menu w-52 rounded-box bg-base-100 shadow-sm">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
}
