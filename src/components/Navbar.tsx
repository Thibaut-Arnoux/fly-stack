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
            <a>Item 1</a>
          </li>
          <li>
            <a>Parent</a>
            <ul className="p-2">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <a className="btn btn-ghost text-xl">{appName}</a>
      <ul className="menu menu-horizontal px-1 hidden lg:flex">
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <details>
            <summary>Parent</summary>
            <ul className="p-2">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </ul>
    </div>
  );
};
