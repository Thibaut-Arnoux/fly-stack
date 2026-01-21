import { createFileRoute } from '@tanstack/react-router';
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
          <button type="button" className="btn">
            Click me
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
          <textarea className="textarea" placeholder="Bio"></textarea>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
}
