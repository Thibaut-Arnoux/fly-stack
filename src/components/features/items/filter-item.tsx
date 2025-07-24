export const FilterItem = () => {
  return (
    <ul className="menu rounded-box w-full">
      <li>
        <a>Parent</a>
        <ul>
          <li>
            <a>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                Childssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
              </span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  );
};
