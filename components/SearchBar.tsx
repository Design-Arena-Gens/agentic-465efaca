interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search by tool, feature, or need...'
}: SearchBarProps) {
  return (
    <label className="search-bar">
      <span className="visually-hidden">Search tools</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="search"
        aria-label="Search AI study tools"
      />
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        width={20}
        height={20}
      >
        <path
          fill="currentColor"
          d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 0 0 1.57-4.23A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l4.25 4.24L19.74 18zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
        />
      </svg>
    </label>
  );
}
