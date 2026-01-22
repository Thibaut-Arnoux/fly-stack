import { Link, type LinkProps } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import { IconButton } from '@/components/ui/buttons/icon-button';

type NavbarLink = LinkProps & {
  label: string;
};

export const Navbar = ({ links = [] }: { links?: NavbarLink[] }) => {
  const appName = import.meta.env.VITE_APP_NAME;

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="dropdown">
        <IconButton variant="ghost" className="lg:hidden" icon={<Menu />} />
        <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          {links.map((link) => (
            <li key={link.label}>
              <Link {...link}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <Link className="btn btn-ghost text-xl" to="/">
        {appName}
      </Link>
      <ul className="menu menu-horizontal px-1 hidden lg:flex">
        {links.map((link) => (
          <li key={link.label}>
            <Link {...link}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
