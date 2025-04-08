import { Link } from '@tanstack/react-router';

export const Navbar = () => {
  const appName = import.meta.env.VITE_APP_NAME;

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="dropdown">
        <button tabIndex={0} type="button" className="btn btn-ghost lg:hidden">
          <svg
            role="img"
            aria-label="mobile_menu"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </button>
        <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <Link to="/classes">Classes</Link>
          </li>
        </ul>
      </div>
      <Link className="btn btn-ghost text-xl" to="/">
        {appName}
      </Link>
      <ul className="menu menu-horizontal px-1 hidden lg:flex">
        <li>
          <Link to="/classes">Classes</Link>
        </li>
      </ul>
    </div>
  );
};
